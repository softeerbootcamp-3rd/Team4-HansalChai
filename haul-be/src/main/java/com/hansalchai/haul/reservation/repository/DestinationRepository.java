package com.hansalchai.haul.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.reservation.entity.Destination;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
}
