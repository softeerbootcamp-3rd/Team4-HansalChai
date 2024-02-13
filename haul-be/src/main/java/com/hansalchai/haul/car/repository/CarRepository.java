package com.hansalchai.haul.car.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.car.entity.Car;

public interface CarRepository extends JpaRepository<Car, Long> {

}
