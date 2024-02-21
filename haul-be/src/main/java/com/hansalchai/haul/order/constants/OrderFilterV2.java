package com.hansalchai.haul.order.constants;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

public enum OrderFilterV2 {

	DEFAULT {
		@Override
		public Page<Reservation> execute(
			ReservationRepository reservationRepository, Long carId, ArrayList<String> selectedSidoArray, PageRequest pageRequest) {
			return reservationRepository.findAllOrdersV2(carId, selectedSidoArray, pageRequest);
		}
	},
	FEE {
		@Override
		public Page<Reservation> execute(ReservationRepository reservationRepository, Long carId,
			ArrayList<String> selectedSidoArray, PageRequest pageRequest) {
			return reservationRepository.findAllOrderByFeeV2(carId, selectedSidoArray, pageRequest);
		}
	},
	DATETIME {
		@Override
		public Page<Reservation> execute(ReservationRepository reservationRepository, Long carId,
			ArrayList<String> selectedSidoArray, PageRequest pageRequest) {
			return reservationRepository.findAllOrderByDateTimeV2(carId, selectedSidoArray,pageRequest);
		}
	};

	public abstract Page<Reservation> execute(ReservationRepository reservationRepository, Long carId,
		ArrayList<String> selectedSidoArray, PageRequest pageRequest);

	public static OrderFilterV2 findFilter(String sort) {
		sort = sort.toUpperCase();
		if (!Arrays.toString(values()).contains(sort)) {
			throw new BadRequestException(ErrorCode.UNSUPPORTED_QUERY_VALUE);
		}
		return valueOf(sort);
	}
}

