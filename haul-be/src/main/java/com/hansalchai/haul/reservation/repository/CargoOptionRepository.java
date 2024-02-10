package com.hansalchai.haul.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.reservation.entity.CargoOption;

public interface CargoOptionRepository extends JpaRepository<CargoOption, Long> {
}
