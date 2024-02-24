package com.hansalchai.haul.order.constants;

import org.apache.commons.lang3.function.TriFunction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

import lombok.Getter;

@Getter
public enum OrderStatusCategory {
	BEFORE_DELIVERY((id,pageable, repo) -> repo.findByDriverIdDelivery(id, "NOT_STARTED",pageable), "운송 전"),
	DURING_DELIVERY((id, pageable, repo) -> repo.findByDriverIdDelivery(id,"IN_PROGRESS", pageable), "운송 중"),
	AFTER_DELIVERY((id, pageable, repo) -> repo.findByDriverIdDelivery(id, "DONE",pageable),"운송 완료");

	private final TriFunction<Long, Pageable, ReservationRepository, Page<Reservation>> function;
	private final String code;

	OrderStatusCategory(TriFunction<Long, Pageable, ReservationRepository, Page<Reservation>> function, String code) {
		this.function = function;
		this.code = code;
	}

	public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository repository) {
		return function.apply(id, pageable, repository);
	}

	public static OrderStatusCategory findOrderByCode(String code) {
		for (OrderStatusCategory category : OrderStatusCategory.values()) {
			if (category.getCode().equals(code)) {
				return category;
			}
		}
		throw new BadRequestException(ErrorCode.UNSUPPORTED_QUERY_VALUE);
	}
}