package com.hansalchai.haul.order.service;

import static com.hansalchai.haul.car.constants.CarCategory.*;
import static com.hansalchai.haul.order.dto.OrderRequest.*;
import static com.hansalchai.haul.order.dto.OrderResponse.*;
import static com.hansalchai.haul.order.dto.OrderResponse.OrderSearchResponseDto.*;
import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.constants.TransportType.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.car.repository.CarRepository;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.order.facade.OptimisticLockOrderFacade;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Source;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.reservation.service.ReservationService;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.annotation.PostConstruct;

@SpringBootTest
class OrderServiceIntegrationTest {

	@Autowired
	OrderService orderService;
	@Autowired
	OptimisticLockOrderFacade orderFacade;
	@Autowired
	UsersRepository usersRepository;
	@Autowired
	OwnerRepository ownerRepository;
	@Autowired
	ReservationRepository reservationRepository;
	@Autowired
	CarRepository carRepository;

	Long userId;
	Long ownerId;
	Long carId;

	@PostConstruct
	void makeData() {

		Car car = Car.builder()
			.type(CarType.TRUCK1000)
			.model("포터2")
			.width(200)
			.length(1000)
			.height(200)
			.weight(1000)
			.photo("포터1.png")
			.category(DEFAULT)
			.isboxtruck(true)
			.build();
		carId = carRepository.save(car).getCarId();

		Users user = Users.builder()
			.name("owner")
			.email("owner@gmail.com")
			.tel("01012341234")
			.password("password")
			.role(Role.CUSTOMER)
			.build();
		userId = usersRepository.save(user).getUserId();

		Owner owner = Owner.builder()
			.user(user)
			.car(car)
			.number("82가 328")
			.build();
		ownerId = ownerRepository.save(owner).getOwnerId();
	}

	@Test
	@Transactional
	@DisplayName("전체 오더 리스트 탐색 테스트 - 사용자 차가 필요한 오더를 가격순으로 정렬해서 보여준다")
	void findAllOrderByFee() {

		//given
		String sort = "fee";
		int page = 0;
		createReservationForFindAllTest(carId);

		//when
		OrderSearchResponseDto result = orderService.findAll(userId, sort, page);

		//then
		List<OrderSearchItem> dtos = result.getOrderSearchItems();
		assertThat(dtos).hasSize(2);

		List<Integer> actualFees = dtos.stream().map(OrderSearchItem::getCost).toList();
		List<Integer> expectedFees = List.of(15, 10);
		assertEquals(actualFees, expectedFees);

		assertThat(result.isLastPage()).isTrue();
	}

	@Test
	@Transactional
	@DisplayName("전체 오더 리스트 탐색 테스트 - 사용자 차가 필요한 오더를 시간순으로 정렬해서 보여준다")
	void findAllOrderByDateTime() {

		//given
		String sort = "datetime";
		int page = 0;
		createReservationForFindAllTest(carId);

		//when
		OrderSearchResponseDto result = orderService.findAll(userId, sort, page);

		//then
		List<OrderSearchItem> dtos = result.getOrderSearchItems();
		assertThat(dtos).hasSize(2);

		List<String> actualDateTimes = dtos.stream().map(OrderSearchItem::getTransportDatetime).toList();
		List<String> expectedDateTimes = List.of("2024.03.22 14:40", "2024.03.22 15:40");
		assertEquals(actualDateTimes, expectedDateTimes);

		assertThat(result.isLastPage()).isTrue();
	}

	@Test
	@Transactional
	@DisplayName("예약 승인 테스트")
	void approveV2() {

		// given
		Long reservationId = createReservationForApproveV2Test();
		ApproveRequestDto approveRequestDto = ApproveRequestDto.builder().id(reservationId).build();
		createReservationForFindAllTest(carId);

		//when
		orderService.approveV2(userId, approveRequestDto);

		//then
		Reservation reservation = reservationRepository.findById(reservationId).orElseThrow();
		Owner owner = ownerRepository.findById(ownerId).orElseThrow();
		assertThat(reservation.getOwner()).isNotNull();
		assertThat(reservation.getOwner()).isEqualTo(owner);
		assertThat(reservation.getTransport().getTransportStatus()).isEqualTo(NOT_STARTED);
	}

	@Rollback
	@Test
	@DisplayName("동시성 테스트- 동시에 2개 이상의 승인 요청")
	void approveV2ConcurrencyTest() throws InterruptedException {

		// given
		int number = 5;
		List<Owner> owners = registerOwners(number);
		Long reservationId = createReservationForApproveV2Test();
		ApproveRequestDto approveRequestDto = new ApproveRequestDto(reservationId);

		ExecutorService executorService = Executors.newFixedThreadPool(number);
		CountDownLatch latch = new CountDownLatch(number);

		// when
		for (Owner owner : owners) {
			executorService.submit(() -> {
				try {
					orderFacade.approveV2(owner.getUser().getUserId(), approveRequestDto);
				} catch (InterruptedException e) {
					throw new RuntimeException(e);
				} finally {
					latch.countDown();
				}
			});
		}

		latch.await();

		Reservation reservation = reservationRepository.findById(reservationId)
			.orElseThrow();
		assertThat(reservation.getOwner()).isNotNull();
	}

	private List<Owner> registerOwners(int number) {
		List<Owner> owners = new ArrayList<>();
		for (int i = 1; i <= number; i++) {
			Users user = Users.builder()
				.name("owner" + i)
				.email("owner" + i + "@gmail.com")
				.tel("0101234123" + i)
				.password("password")
				.role(Role.CUSTOMER)
				.build();
			usersRepository.save(user);
			Owner owner = Owner.builder()
				.user(user)
				.number("82가 328" + i)
				.build();
			ownerRepository.save(owner);

			owners.add(owner);
		}
		return owners;
	}

	private List<Reservation> createReservationForFindAllTest(Long carId) {

		Car car1 = carRepository.findById(carId).orElseThrow();

		Car car2 = Car.builder()
			.type(CarType.TRUCK500)
			.model("뉴다마스")
			.width(120)
			.length(175)
			.height(120)
			.weight(500)
			.photo("뉴다마스.png")
			.category(DEFAULT)
			.isboxtruck(false)
			.build();
		carRepository.save(car2);

		Source source1 = Source.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("1호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Source source2 = Source.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("2호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Source source3 = Source.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("3호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Source source4 = Source.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("4호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Destination destination1 = Destination.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("1호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Destination destination2 = Destination.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("2호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Destination destination3 = Destination.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("3호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Destination destination4 = Destination.builder()
			.name("강남 가가빌딩")
			.address("서울특별시 강남구 가가로 21-9")
			.detailAddress("4호")
			.latitude(34.36454231)
			.longitude(126.87456)
			.tel("01012344321")
			.build();

		Transport transport1 = Transport.builder()
			.type(GENERAL)
			.transportStatus(PENDING)
			.fee(100_000)
			.requiredTime(1.5)
			.build();

		Transport transport2 = Transport.builder()
			.type(MOVE)
			.transportStatus(PENDING)
			.fee(150_000)
			.requiredTime(1)
			.build();

		Transport transport3 = Transport.builder()
			.type(GENERAL)
			.transportStatus(PENDING)
			.fee(200_000)
			.requiredTime(2.3)
			.build();

		Transport transport4 = Transport.builder()
			.type(GENERAL)
			.transportStatus(NOT_RESERVATED)
			.fee(450_000)
			.requiredTime(10.7)
			.build();

		Reservation reservation1 = Reservation.builder()
			.car(car1)
			.transport(transport1)
			.number("123456789011")
			.source(source1)
			.destination(destination1)
			.date(LocalDate.of(2024, 3, 22))
			.time(LocalTime.of(14, 40))
			.count(1)
			.distance(30.1)
			.build();

		Reservation reservation2 = Reservation.builder()
			.car(car1)
			.transport(transport2)
			.number("123456789012")
			.source(source2)
			.destination(destination2)
			.date(LocalDate.of(2024, 3, 22))
			.time(LocalTime.of(15, 40))
			.count(1)
			.distance(4.1)
			.build();

		Reservation reservation3 = Reservation.builder()
			.car(car2)
			.transport(transport3)
			.number("123456789013")
			.source(source3)
			.destination(destination3)
			.date(LocalDate.of(2024, 3, 22))
			.time(LocalTime.of(16, 40))
			.count(1)
			.distance(4.1)
			.build();

		Reservation reservation4 = Reservation.builder()
			.car(car1)
			.transport(transport4)
			.number("123456789014")
			.source(source4)
			.destination(destination4)
			.date(LocalDate.of(2024, 2, 21))
			.time(LocalTime.of(18, 0))
			.count(1)
			.distance(100.1)
			.build();

		reservationRepository.save(reservation1);
		reservationRepository.save(reservation2);
		reservationRepository.save(reservation3);
		reservationRepository.save(reservation4);

		return List.of(reservation1, reservation2, reservation3, reservation4);
	}

	private Long createReservationForApproveV2Test() {

		Transport transport = Transport.builder()
			.requiredTime(2.0)
			.transportStatus(PENDING)
			.type(GENERAL)
			.fee(100000)
			.build();

		Reservation reservation = Reservation.builder()
			.owner(null)
			.date(LocalDate.of(2024, 2, 20))
			.time(LocalTime.of(11, 30))
			.transport(transport)
			.number("562341234567")
			.count(1)
			.distance(1.5453)
			.build();

		return reservationRepository.save(reservation).getReservationId();
	}

	private ReservationRequest.CreateReservationDTO makeDummyReservationRequestDTO() {

		ReservationRequest.CreateReservationDTO.SourceDTO src = ReservationRequest.CreateReservationDTO.SourceDTO.builder()
			.name("나나빌딩")
			.address("광주광역시 서구 상무민주로 119 나나빌딩")
			.tel("01012345678")
			.detailAddress("3층")
			.latitude(37.4851943071576)
			.longitude(126.717952447459)
			.build();

		ReservationRequest.CreateReservationDTO.DestinationDTO dst = ReservationRequest.CreateReservationDTO.DestinationDTO.builder()
			.name("종갓집 양곱창")
			.address("부산광역시 연제구 거제대로178번길 51-2")
			.tel("01012345678")
			.detailAddress("1층")
			.latitude(37.4482284563797)
			.longitude(126.649653068211)
			.build();

		ReservationRequest.CreateReservationDTO.CargoDTO cargo = ReservationRequest.CreateReservationDTO.CargoDTO.builder()
			.width(1)
			.length(1)
			.height(1)
			.weight(1)
			.build();

		ReservationRequest.CreateReservationDTO.CargoOptionDTO cargoOption = ReservationRequest.CreateReservationDTO.CargoOptionDTO.builder()
			.isRefrigerated(true)
			.isFurniture(false)
			.isLiftRequired(false)
			.isFrozen(false)
			.build();

		return new ReservationRequest.CreateReservationDTO(
			"일반 용달",
			LocalDate.parse("2024-02-14"),
			LocalTime.parse("14:30:00"),
			src,
			dst,
			cargo,
			cargoOption
		);
	}
}
