package com.hansalchai.haul.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.reservation.entity.Reservation;

public interface reservationRepository extends JpaRepository<Reservation, Integer> {

}
