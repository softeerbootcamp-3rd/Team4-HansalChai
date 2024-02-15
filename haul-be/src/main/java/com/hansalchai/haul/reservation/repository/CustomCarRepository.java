package com.hansalchai.haul.reservation.repository;

import java.util.List;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.reservation.entity.Cargo;

public interface CustomCarRepository {
	List<Car> findProperCar(CarCategory carCategory, Cargo cargo);
}
