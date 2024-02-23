package com.hansalchai.haul.order.service;

import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
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

import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.entity.Reservation;
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
		given(reservationRepository.findByIdWithPessimisticLock(reservationId)).willReturn(Optional.of(newReservation));
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
		given(reservationRepository.findByIdWithPessimisticLock(reservationId)).willReturn(Optional.of(newReservation));
		given(reservationRepository.findScheduleOfDriver(ownerId,
			LocalDate.of(2024, 2, 19),
			LocalDate.of(2024, 2, 20))).willReturn(reservations);

		//when, then
		assertThrows(ConflictException.class,
			() -> orderService.approveV2(userId, new ApproveRequestDto(reservationId)));
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
}
