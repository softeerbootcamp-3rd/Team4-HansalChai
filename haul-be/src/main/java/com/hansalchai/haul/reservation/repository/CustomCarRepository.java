package com.hansalchai.haul.reservation.repository;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.reservation.entity.Cargo;

public interface CustomCarRepository {
	Car findProperCar(CarType type, CarCategory carCategory, Cargo cargo);
}
