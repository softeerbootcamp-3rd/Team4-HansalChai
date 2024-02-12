package com.hansalchai.haul.reservation.repository;

import static com.hansalchai.haul.car.entity.QCar.*;

import org.springframework.stereotype.Repository;

import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.reservation.entity.Cargo;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class CustomCarRepositoryImpl implements CustomCarRepository {
	private final JPAQueryFactory jpaQueryFactory;

	public CustomCarRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	@Override
	public Car findProperCar(CarType type, CarCategory carCategory, Cargo cargo) {
		return jpaQueryFactory.selectFrom(car)
			.where(car.type.eq(type)
				.and(car.category.eq(carCategory)))
			//TODO 짐 크기에 맞는 차 추천 추가예정
			//TODO 짐을 회전시키는 방법도 고안해보자
			.fetchOne();
	}
}
