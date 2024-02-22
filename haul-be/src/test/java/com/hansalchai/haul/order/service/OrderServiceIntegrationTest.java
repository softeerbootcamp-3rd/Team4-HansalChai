package com.hansalchai.haul.order.service;

import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.constants.TransportType.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

@SpringBootTest
class OrderServiceIntegrationTest {

	@Autowired OrderService orderService;
	@Autowired UsersRepository usersRepository;
	@Autowired OwnerRepository ownerRepository;
	@Autowired ReservationRepository reservationRepository;

	@Rollback
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
}
