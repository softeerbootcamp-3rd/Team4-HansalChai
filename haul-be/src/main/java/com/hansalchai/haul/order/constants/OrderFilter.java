package com.hansalchai.haul.order.constants;

import java.util.Arrays;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

public enum OrderFilter {

	DEFAULT {
		@Override
		public Page<Reservation> execute(ReservationRepository reservationRepository, Long carId, PageRequest pageRequest) {
			return reservationRepository.findAllOrders(carId, pageRequest);
		}
	},
	FEE {
		@Override
		public Page<Reservation> execute(ReservationRepository reservationRepository, Long carId, PageRequest pageRequest) {
			return reservationRepository.findAllOrderByFee(carId, pageRequest);
		}
	},
	DATETIME {
		@Override
		public Page<Reservation> execute(ReservationRepository reservationRepository, Long carId, PageRequest pageRequest) {
			return reservationRepository.findAllOrderByDateTime(carId, pageRequest);
		}
	};

	public abstract Page<Reservation> execute(ReservationRepository reservationRepository, Long carId, PageRequest pageRequest);

	public static OrderFilter findFilter(String sort) {
		sort = sort.toUpperCase();
		if (!Arrays.toString(values()).contains(sort)) {
			throw new BadRequestException(ErrorCode.UNSUPPORTED_QUERY_VALUE);
		}
		return valueOf(sort);
	}
}
