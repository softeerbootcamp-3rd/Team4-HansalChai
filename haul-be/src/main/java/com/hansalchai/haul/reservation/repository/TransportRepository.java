package com.hansalchai.haul.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.reservation.entity.Transport;

public interface TransportRepository extends JpaRepository<Transport, Integer> {
}
