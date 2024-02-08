package com.hansalchai.haul.driver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.driver.entity.Driver;

public interface DriverRepository extends JpaRepository<Driver, Integer> {

}
