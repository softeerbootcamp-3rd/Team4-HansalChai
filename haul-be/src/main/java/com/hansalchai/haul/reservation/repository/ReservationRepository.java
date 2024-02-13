package com.hansalchai.haul.reservation.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.reservation.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	Page<Reservation> findByCustomerId(Long userId, Pageable pageable);
}
