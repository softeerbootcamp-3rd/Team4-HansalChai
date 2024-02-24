package com.hansalchai.haul.reservation.repository;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hansalchai.haul.reservation.entity.Reservation;

import jakarta.persistence.LockModeType;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	@Query(value = "select v from Reservation v where v.user.userId = :userId and v.transport.transportStatus = :transportStatus order by v.date, v.time")
	Page<Reservation> findByUserId(@Param("userId") Long userId,@Param("transportStatus")String transportStatus, Pageable pageable);

	@Query(value = "select v from Reservation v where v.number = :number and v.transport.transportStatus != 'NOT_RESERVATED'")
	Optional<Reservation> findByNumber(@Param("number") String number);

	@Query(value = "select v from Reservation v where v.owner.user.userId = :userId and v.transport.transportStatus = :transportStatus order by v.date, v.time")
	Page<Reservation> findByDriverIdDelivery(@Param("userId")Long id,@Param("transportStatus")String transportStatus ,Pageable pageable);

	@Query("select r "
		+ "from Reservation r "
		+ "where r.transport.transportStatus = 'PENDING' "
			+ "and r.car.carId = :carId "
			+ "and cast(r.date || ' ' || r.time AS timestamp) > current_timestamp ")
	Page<Reservation> findAllOrders(@Param("carId") Long carId, Pageable pageable);  // 오더 접수순으로 정렬

	@Query("select r "
		+ "from Reservation r join Transport t "
		+ "on r.transport.transportId = t.transportId "
		+ "where r.transport.transportStatus = 'PENDING' "							 // 기사 배정 전의 오더만 노출
			+ "and r.car.carId = :carId "											 // 기사가 가진 차에 해당하는 오더만 노출
			+ "and cast(r.date || ' ' || r.time AS timestamp) > current_timestamp "	 // 날짜가 지난 오더 제외
		+ "order by t.fee desc")
	Page<Reservation> findAllOrderByFee(@Param("carId") Long carId, Pageable pageable);

	@Query("select r "
		+ "from Reservation r "
		+ "where r.transport.transportStatus = 'PENDING' "
			+ "and r.car.carId = :carId "
			+ "and cast(r.date || ' ' || r.time AS timestamp) > current_timestamp "
		+ "order by r.date, r.time")
	Page<Reservation> findAllOrderByDateTime(@Param("carId") Long carId, Pageable pageable);

	@Query("select r "
		+ "from Reservation r "
		+ "where r.owner.ownerId = :driverId "
		+ "and r.date between :prevDate and :today "
		+ "and r.transport.transportStatus in ('NOT_STARTED', 'IN_PROGRESS')")
	List<Reservation> findScheduleOfDriver(
		@Param("driverId") Long driverId,
		@Param("prevDate") LocalDate prevDate,
		@Param("today") LocalDate today);

	@Query(value = "select r from Reservation r where r.owner.user.userId = :userId and r.transport.transportStatus = 'IN_PROGRESS'")
	List<Reservation> findByDriverIdInProgress(@Param("userId")Long id);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select r from Reservation r where r.id = :id")
	Optional<Reservation> findByIdWithPessimisticLock(@Param("id") Long id);
}
