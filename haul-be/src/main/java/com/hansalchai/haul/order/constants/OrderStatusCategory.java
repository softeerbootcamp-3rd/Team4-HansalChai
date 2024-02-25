package com.hansalchai.haul.order.constants;

import org.apache.commons.lang3.function.TriFunction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

import lombok.Getter;

@Getter
public enum OrderStatusCategory {
	BEFORE_DELIVERY("운송 전") {
		@Override
		public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository reservationRepository) {
			return reservationRepository.findByDriverIdDelivery(id, TransportStatus.PENDING, pageable);
		}
	},
	DURING_DELIVERY("운송 중") {
		@Override
		public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository reservationRepository) {
			return reservationRepository.findByDriverIdDelivery(id, TransportStatus.IN_PROGRESS, pageable);
		}
	},
	AFTER_DELIVERY("운송 완료") {
		@Override
		public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository reservationRepository) {
			return reservationRepository.findByDriverIdDelivery(id, TransportStatus.DONE, pageable);
		}
	};

	private final String code;

	OrderStatusCategory(String code) {
		this.code = code;
	}

	public abstract Page<Reservation> execute( Long carId, Pageable pageable, ReservationRepository reservationRepository);

	public static OrderStatusCategory findOrderByCode(String code) {
		for (OrderStatusCategory category : OrderStatusCategory.values()) {
			if (category.getCode().equals(code)) {
				return category;
			}
		}
		throw new BadRequestException(ErrorCode.UNSUPPORTED_QUERY_VALUE);
	}
}