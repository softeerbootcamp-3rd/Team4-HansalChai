package com.hansalchai.haul.reservation.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hansalchai.haul.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	@Query(value = "select v from Reservation v where v.user.userId = :userId order by v.date, v.time")
	Page<Reservation> findByUserId(@Param("userId") Long userId, Pageable pageable);

	@Query(value = "select v from Reservation v where v.owner.user.userId = :userId order by v.date, v.time")
	Page<Reservation> findByDriverId(@Param("userId") Long userId, Pageable pageable);

	@Query(value = "select v from Reservation v where v.number = :number")
	Optional<Reservation> findByNumber(@Param("number") String number);
}
