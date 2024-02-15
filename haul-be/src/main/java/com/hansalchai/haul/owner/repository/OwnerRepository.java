package com.hansalchai.haul.owner.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hansalchai.haul.owner.entity.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

	@Query("select o from Owner o where o.user.userId = :driverId and o.car.carId = :carId")
	Optional<Owner> findByDriverIdAndCarId(@Param("driverId") Long driverId, @Param("carId") Long carId);
}
