package com.hansalchai.haul.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.reservation.entity.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
}
