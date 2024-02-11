package com.hansalchai.haul.reservation.repository;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.car.entity.Car;

public interface CustomCarRepository {
	Car findProperCar(String type, CarCategory carCategory);
}
