package com.hansalchai.haul.order.service;

import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.constants.TransportType.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.car.repository.CarRepository;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.dto.OrderResponse;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.reservation.service.ReservationService;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
class OrderServiceIntegrationTest {

	@Autowired OrderService orderService;
	@Autowired UsersRepository usersRepository;
	@Autowired OwnerRepository ownerRepository;
	@Autowired ReservationRepository reservationRepository;
	@Autowired ReservationService reservationService;
	@Autowired CarRepository carRepository;

	@RepeatedTest(3)
	@DisplayName("동시성 테스트- 동시에 2개 이상의 승인 요청")
	void approveV2() throws InterruptedException {

		// given
		List<Owner> owners = registerOwners(5);
		Long reservationId = createReservationForApproveV2();
		ApproveRequestDto approveRequestDto = new ApproveRequestDto(reservationId);

		int threadCount = 5;
		ExecutorService executorService = Executors.newFixedThreadPool(5);
		CountDownLatch latch = new CountDownLatch(threadCount);

		// when
		List<Future<Void>> futures = new ArrayList<>();

		for (Owner owner : owners) {
			Future<Void> future = executorService.submit(() -> {
				try {
					orderService.approveV2(owner.getUser().getUserId(), approveRequestDto);
				} finally {
					latch.countDown();
				}
				return null;
			});
			futures.add(future);
		}

		latch.await();

		assertThat(assertThrows(ExecutionException.class, () -> {
			for (Future<Void> future : futures) {
				future.get();
			}
		}).getCause()).isInstanceOf(ConflictException.class);

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

	private Long createReservationForApproveV2() {

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
