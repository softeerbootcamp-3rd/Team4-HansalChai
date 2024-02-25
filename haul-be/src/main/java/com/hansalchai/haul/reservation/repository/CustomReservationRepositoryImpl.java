package com.hansalchai.haul.reservation.repository;

import static com.hansalchai.haul.reservation.entity.QReservation.*;
import static com.hansalchai.haul.reservation.entity.QSource.*;
import static com.hansalchai.haul.reservation.entity.QTransport.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class CustomReservationRepositoryImpl implements CustomReservationRepository {
	private final JPAQueryFactory jpaQueryFactory;

	private OrderSpecifier<?> customSidoOrder(ArrayList<String> sidoArray) {
		NumberExpression<Integer> caseExpression = new CaseBuilder()
			.when(source.sido.eq(sidoArray.get(0))).then(1).otherwise(sidoArray.size() + 1);
		for (int i = 1; i < sidoArray.size(); i++) {
			caseExpression = new CaseBuilder().when(source.sido.eq(sidoArray.get(i)))
				.then(i + 1)
				.otherwise(caseExpression);
		}
		return new OrderSpecifier<>(Order.ASC, caseExpression);
	}

	public CustomReservationRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
		this.jpaQueryFactory = jpaQueryFactory;
	}

	LocalDateTime now = LocalDateTime.now();
	BooleanExpression isAfterCurrentTimestamp =
		reservation.date.after(now.toLocalDate())
			.or(reservation.date.eq(now.toLocalDate())
				.and(reservation.time.after(now.toLocalTime())));

	@Override
	public Long countAllOrdersQdsl(Long carId, ArrayList<String> sidoArray) {
		return jpaQueryFactory.select(reservation.count())
			.from(reservation)
			.join(reservation.transport, transport)
			.join(reservation.source, source)
			.where(
				transport.transportStatus.eq(TransportStatus.PENDING),
				reservation.car.carId.eq(carId),
				isAfterCurrentTimestamp,
				source.sido.in(sidoArray))
			.fetchOne();
	}

	@Override
	public List<Reservation> findAllOrdersV2(Long carId, ArrayList<String> sidoArray, Pageable pageable) {
		return jpaQueryFactory.selectFrom(reservation)
			.join(reservation.transport, transport)
			.join(reservation.source, source)
			.where(
				transport.transportStatus.eq(TransportStatus.PENDING),
				reservation.car.carId.eq(carId),
				isAfterCurrentTimestamp,
				source.sido.in(sidoArray)
			)
			.orderBy(customSidoOrder(sidoArray))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public List<Reservation> findAllOrderByFeeV2(Long carId, ArrayList<String> sidoArray, Pageable pageable) {
		return jpaQueryFactory.selectFrom(reservation)
			.join(reservation.transport, transport)
			.join(reservation.source, source)
			.where(
				transport.transportStatus.eq(TransportStatus.PENDING),
				reservation.car.carId.eq(carId),
				isAfterCurrentTimestamp,
				source.sido.in(sidoArray))
			.orderBy(customSidoOrder(sidoArray), transport.fee.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public List<Reservation> findAllOrderByDateTimeV2(Long carId, ArrayList<String> sidoArray, Pageable pageable) {
		return jpaQueryFactory.selectFrom(reservation)
			.join(reservation.transport, transport)
			.join(reservation.source, source)
			.where(
				transport.transportStatus.eq(TransportStatus.PENDING),
				reservation.car.carId.eq(carId),
				isAfterCurrentTimestamp,
				source.sido.in(sidoArray))
			.orderBy(customSidoOrder(sidoArray), reservation.date.asc(), reservation.time.asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

}
