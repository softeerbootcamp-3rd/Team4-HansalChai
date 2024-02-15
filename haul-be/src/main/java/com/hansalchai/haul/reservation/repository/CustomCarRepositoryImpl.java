package com.hansalchai.haul.reservation.repository;

import static com.hansalchai.haul.car.entity.QCar.*;

import java.util.List;

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
	public List<Car> findProperCar(CarCategory carCategory, Cargo cargo) {
		//TODO 짐을 회전시키는 방법도 고안해보자
		return jpaQueryFactory.selectFrom(car)
			.where(car.category.eq(carCategory)
				.and(car.height.loe(cargo.getHeight()))
				.and(car.length.loe(cargo.getLength()))
				.and(car.width.loe(cargo.getWidth()))
			)
			.fetch();
	}
}
