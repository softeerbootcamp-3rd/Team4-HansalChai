package com.hansalchai.haul.reservation.repository;

import static com.hansalchai.haul.car.entity.QCar.*;

import org.springframework.stereotype.Repository;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.car.constants.CarCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class CustomCarRepositoryImpl implements CustomCarRepository {
	private final JPAQueryFactory jpaQueryFactory;

	public CustomCarRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@Override
	public Car findProperCar(String type, CarCategory carCategory) {
		return jpaQueryFactory.selectFrom(car)
			.where(car.type.eq(type)
				.and(car.category.eq(carCategory)))
			.fetchOne();
	}
}
