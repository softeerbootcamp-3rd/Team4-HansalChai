package com.hansalchai.haul.order.service;

import static com.hansalchai.haul.order.dto.OrderRequest.*;
import static com.hansalchai.haul.order.dto.OrderResponse.*;
import static com.hansalchai.haul.order.dto.OrderResponse.OrderSearchResponseDto.*;
import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.service.ReservationService.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.common.exceptions.ForbiddenException;
import com.hansalchai.haul.order.constants.OrderFilter;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Source;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.user.entity.Users;

@ExtendWith(MockitoExtension.class)
class OrderServiceUnitTest {

	@InjectMocks
	OrderService orderService;

	@Mock
	ReservationRepository reservationRepository;

	@Mock
	OwnerRepository ownerRepository;

	@Test
	@DisplayName("전체 오더 리스트 탐색 테스트")
	void findAllTest() {

		//given
		String sort = "fee";
		int page = 0;

		Long userId = 1L;
		Long ownerId = 12L;
		Long carId = 123L;

		Users user = Users.builder().userId(userId).build();
		Car car = Car.builder().carId(carId).build();
		Owner owner = Owner.builder()
			.ownerId(ownerId)
			.user(user)
			.car(car)
			.build();

		PageRequest pageRequest = PageRequest.of(page, PAGECUT);
		Page<Reservation> reservationsPage = createReservationsForFindAllTest();
		given(ownerRepository.findByUserId(userId)).willReturn(Optional.of(owner));
		given(OrderFilter.FEE.execute(reservationRepository, carId, pageRequest)).willReturn(reservationsPage);

		//when
		OrderSearchResponseDto result = orderService.findAll(userId, sort, page);

		//then
		OrderSearchItem dto1 = result.getOrderSearchItems().get(0);
		assertThat(result.getOrderSearchItems()).hasSize(3);
		assertThat(dto1.getSrcSimpleAddress()).isEqualTo("인천 미추홀구");
		assertThat(dto1.getDstSimpleAddress()).isEqualTo("부산 연제구");
		assertThat(dto1.getTransportDatetime()).isEqualTo("2024.02.20 11:30");
		assertThat(result.isLastPage()).isTrue();
	}

	@Test
	@DisplayName("오더 승인 v2 성공 테스트")
	void approveV2SuccessTest() {

		//given
		Long userId = 1L;
		Long ownerId = 12L;
		Long reservationId = 123L;

		Users user = Users.builder().userId(userId).build();
		Owner owner = Owner.builder().ownerId(ownerId).user(user).build();

		Transport newTransport = Transport.builder().transportStatus(PENDING).requiredTime(3.0).build();
		Reservation newReservation = Reservation.builder()
			.reservationId(reservationId)
			.owner(null)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(11, 0))
			.transport(newTransport)
			.build();

		List<Reservation> reservations = createReservationsForApproveTest(owner);

		given(ownerRepository.findByUserId(userId)).willReturn(Optional.of(owner));
		given(reservationRepository.findByIdWithOptimisticLock(reservationId)).willReturn(Optional.of(newReservation));
		given(reservationRepository.findScheduleOfDriver(ownerId,
			LocalDate.of(2024, 2, 19),
			LocalDate.of(2024, 2, 20))).willReturn(reservations);

		//when
		orderService.approveV2(userId, new ApproveRequestDto(reservationId));

		//then
		assertThat(newReservation.getOwner()).isNotNull();
		assertThat(newReservation.getTransport().getTransportStatus()).isEqualTo(NOT_STARTED);
	}

	@Test
	@DisplayName("오더 승인 v2 실패 테스트 - 스케줄 중첩")
	void approveV2FailTest() {

		//given
		Long userId = 1L;
		Long ownerId = 12L;
		Long reservationId = 123L;

		Users user = Users.builder().userId(userId).build();
		Owner owner = Owner.builder().ownerId(ownerId).user(user).build();

		Transport newTransport = Transport.builder().transportStatus(PENDING).requiredTime(3.0).build();
		Reservation newReservation = Reservation.builder()
			.owner(null)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(10, 30))
			.transport(newTransport)
			.build();

		List<Reservation> reservations = createReservationsForApproveTest(owner);

		given(ownerRepository.findByUserId(userId)).willReturn(Optional.of(owner));
		given(reservationRepository.findByIdWithOptimisticLock(reservationId)).willReturn(Optional.of(newReservation));
		given(reservationRepository.findScheduleOfDriver(ownerId,
			LocalDate.of(2024, 2, 19),
			LocalDate.of(2024, 2, 20))).willReturn(reservations);

		//when, then
		assertThrows(ConflictException.class,
			() -> orderService.approveV2(userId, new ApproveRequestDto(reservationId)));
	}

	@Test
	@DisplayName("오더 운송상태 변경 가능 테스트 - 출발지에서 운송 전을 운송 중으로 변경하는 케이스")
	void changeTransportStatusV2SuccessTest1() {

		Long userId = 1L;
		Long ownerId = 12L;
		Long reservationId = 123L;
		Reservation reservation = createReservationForChaneStatusV2Test(userId, ownerId, reservationId, NOT_STARTED);

		List<Reservation> reservations = createReservationsForchangeTransportStatusV2(reservationId);
		given(reservationRepository.findById(reservationId)).willReturn(Optional.of(reservation));
		given(reservationRepository.findInProgressReservationByUserId(userId)).willReturn(reservations);

		//when
		TransportStatusChangeRequestDtoV2 requestDto = TransportStatusChangeRequestDtoV2.builder()
			.id(reservationId)
			.latitude(37.5138649)  //학동 에티버스
			.longitude(127.0295296)
			.build();
		TransportStatusChangeResponseDtoV2 responseDto = orderService.changeTransportStatusV2(userId, requestDto);

		//then
		assertThat(responseDto.isDriverNearBy()).isTrue();
		assertThat(responseDto.isHasInProgressOrder()).isFalse();
	}

	@Test
	@DisplayName("오더 운송상태 변경 불가능 테스트 - 현위치가 출발지/목적지 300m 안이 아니면 운송상태를 변경할 수 없다")
	void changeTransportStatusV2SuccessTest2() {

		Long userId = 1L;
		Long ownerId = 12L;
		Long reservationId = 123L;
		Reservation reservation = createReservationForChaneStatusV2Test(userId, ownerId, reservationId, NOT_STARTED);
		given(reservationRepository.findById(reservationId)).willReturn(Optional.of(reservation));

		//when
		TransportStatusChangeRequestDtoV2 requestDto = TransportStatusChangeRequestDtoV2.builder()
			.id(reservationId)
			.latitude(37.445620228619)  //인천 미추홀구
			.longitude(126.65182310263)
			.build();
		TransportStatusChangeResponseDtoV2 responseDto = orderService.changeTransportStatusV2(userId, requestDto);

		//then
		assertThat(responseDto.isDriverNearBy()).isFalse();
	}

	@Test
	@DisplayName("오더 운송상태 변경 불가능 테스트 - 진행 중인 오더가 있으면 새로운 오더를 동시에 진행할 수 없으므로 운송 상태를 변경할 수 없다")
	void changeTransportStatusV2SuccessTest3() {

		Long userId = 1L;
		Long ownerId = 12L;
		Long reservationId = 123L;
		Reservation reservation = createReservationForChaneStatusV2Test(userId, ownerId, reservationId, NOT_STARTED);

		TransportStatusChangeRequestDtoV2 requestDto = TransportStatusChangeRequestDtoV2.builder()
			.id(reservationId)
			.build();

		List<Reservation> reservations = createReservationsForchangeTransportStatusV2SuccessTest3(reservationId);
		given(reservationRepository.findById(reservationId)).willReturn(Optional.of(reservation));
		given(reservationRepository.findInProgressReservationByUserId(userId)).willReturn(reservations);

		//when
		TransportStatusChangeResponseDtoV2 responseDto = orderService.changeTransportStatusV2(userId, requestDto);

		//then
		assertThat(responseDto.isHasInProgressOrder()).isTrue();
	}

	@Test
	@DisplayName("오더 운송상태 변경 실패 테스트 - 오더 담당 기사가 아닌데 상태 변경을 요청하면 Forbidden 예외 발생")
	void changeTransportStatusV2FailTest1() {

		Long userId = 1L;
		Long ownerId = 12L;
		Long reservationId = 123L;
		Reservation reservation = createReservationForChaneStatusV2Test(userId, ownerId, reservationId, NOT_STARTED);

		TransportStatusChangeRequestDtoV2 requestDto = TransportStatusChangeRequestDtoV2.builder()
			.id(reservationId)
			.build();

		given(reservationRepository.findById(reservationId)).willReturn(Optional.of(reservation));

		//when, then
		Long maliciousUserId = 44L;
		assertThrows(ForbiddenException.class,
			() -> orderService.changeTransportStatusV2(maliciousUserId, requestDto));
	}

	@Test
	@DisplayName("오더 운송상태 변경 실패 테스트 - 운송 완료된 오더의 상태를 변경하려고 하면 Bad Request 예외 발생")
	void changeTransportStatusV2FailTest2() {

		Long userId = 1L;
		Long ownerId = 12L;
		Long reservationId = 123L;
		Reservation reservation = createReservationForChaneStatusV2Test(userId, ownerId, reservationId, DONE);

		TransportStatusChangeRequestDtoV2 requestDto = TransportStatusChangeRequestDtoV2.builder()
			.id(reservationId)
			.build();

		given(reservationRepository.findById(reservationId)).willReturn(Optional.of(reservation));

		//when, then
		assertThrows(BadRequestException.class,
			() -> orderService.changeTransportStatusV2(userId, requestDto));
	}

	/* ---------------- 예약 데이터 생성 메서드 ---------------- */
	private Page<Reservation> createReservationsForFindAllTest() {

		Source source1 = Source.builder()
			.address("인천 미추홀구 매소홀로 255")
			.build();
		Destination destination1 = Destination.builder()
			.address("부산광역시 연제구 거제대로178번길 51-2")
			.build();
		Transport transport1 = Transport.builder()
			.fee(450_000)
			.build();
		Reservation reservation1 = Reservation.builder()
			.source(source1)
			.destination(destination1)
			.transport(transport1)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(11, 30))
			.build();

		Source source2 = Source.builder()
			.address("인천 미추홀구 매소홀로 255")
			.build();
		Destination destination2 = Destination.builder()
			.address("인천 부평구 경인로701번길 49")
			.build();
		Transport transport2 = Transport.builder()
			.fee(100_000)
			.build();
		Reservation reservation2 = Reservation.builder()
			.source(source2)
			.destination(destination2)
			.transport(transport2)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(11, 30))
			.build();

		Source source3 = Source.builder()
			.address("인천 미추홀구 매소홀로 255")
			.build();
		Destination destination3 = Destination.builder()
			.address("경기 성남시 분당구 경부고속도로 409")
			.build();
		Transport transport3 = Transport.builder()
			.fee(150_000)
			.build();
		Reservation reservation3 = Reservation.builder()
			.source(source3)
			.destination(destination3)
			.transport(transport3)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(11, 30))
			.build();

		List<Reservation> reservations = List.of(reservation1, reservation2, reservation3);
		return new PageImpl<>(reservations);
	}

	@NotNull
	private static List<Reservation> createReservationsForApproveTest(Owner owner) {

		// 24-02-20 08:30 - 10:00
		Transport transport1 = Transport.builder().requiredTime(2).build();
		Reservation reservation1 = Reservation.builder()
			.owner(owner)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(8, 30))
			.transport(transport1)
			.build();

		// 24-02-20 14:30 - 16:00
		Transport transport2 = Transport.builder().requiredTime(1.5).build();
		Reservation reservation2 = Reservation.builder()
			.owner(owner)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(14, 30))
			.transport(transport2)
			.build();

		List<Reservation> reservations = new ArrayList<>();
		reservations.add(reservation1);
		reservations.add(reservation2);
		return reservations;
	}

	private static Reservation createReservationForChaneStatusV2Test(Long userId, Long ownerId, Long reservationId,
		TransportStatus transportStatus) {
		Users user = Users.builder().userId(userId).build();
		Owner owner = Owner.builder().ownerId(ownerId).user(user).build();
		Transport transport = Transport.builder().transportStatus(transportStatus).build();
		Source source = Source.builder().latitude(37.51410107).longitude(127.03123824).build(); //학동역

		return Reservation.builder()
			.reservationId(reservationId)
			.owner(owner)
			.transport(transport)
			.source(source)
			.build();
	}

	private List<Reservation> createReservationsForchangeTransportStatusV2(Long reservationId) {
		Reservation reservation1 = Reservation.builder().reservationId(reservationId).build();
		Reservation reservation2 = Reservation.builder().reservationId(reservationId).build();
		Reservation reservation3 = Reservation.builder().reservationId(reservationId).build();
		return List.of(reservation1, reservation2, reservation3);
	}

	private List<Reservation> createReservationsForchangeTransportStatusV2SuccessTest3(Long reservationId) {
		Long inProgressReservationId = 124L;
		Reservation reservation1 = Reservation.builder().reservationId(reservationId).build();
		Reservation reservation2 = Reservation.builder().reservationId(reservationId).build();
		Reservation reservation3 = Reservation.builder().reservationId(inProgressReservationId).build();
		return List.of(reservation1, reservation2, reservation3);
	}
}
