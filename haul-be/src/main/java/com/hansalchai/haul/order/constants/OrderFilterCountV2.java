package com.hansalchai.haul.order.constants;

import java.util.ArrayList;
import java.util.Arrays;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.reservation.repository.CustomReservationRepositoryImpl;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

public enum OrderFilterCountV2 {
	DEFAULT {
		@Override
		public Long execute(
			CustomReservationRepositoryImpl customReservationRepository, Long carId, ArrayList<String> sidoArray) {
			return customReservationRepository.countAllOrdersQdsl(carId, sidoArray);
		}
	},
	FEE {
		@Override
		public Long execute(CustomReservationRepositoryImpl customReservationRepository, Long carId, ArrayList<String> sidoArray) {
			return customReservationRepository.countAllOrderByFeeQdsl(carId, sidoArray);
		}
	},
	DATETIME {
		@Override
		public Long execute(CustomReservationRepositoryImpl customReservationRepository, Long carId, ArrayList<String> sidoArray) {
			return customReservationRepository.countAllOrderByDateTimeQdsl(carId, sidoArray);
		}
	};

	public abstract Long execute(CustomReservationRepositoryImpl customReservationRepository, Long carId, ArrayList<String> sidoArray);

	public static OrderFilterCountV2 findFilter(String sort) {
		sort = sort.toUpperCase();
		if (!Arrays.toString(values()).contains(sort)) {
			throw new BadRequestException(ErrorCode.UNSUPPORTED_QUERY_VALUE);
		}
		return valueOf(sort);
	}
}
