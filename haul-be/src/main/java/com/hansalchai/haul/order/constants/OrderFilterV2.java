package com.hansalchai.haul.order.constants;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.PageRequest;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.CustomReservationRepositoryImpl;

public enum OrderFilterV2 {

	DEFAULT {
		@Override
		public List<Reservation> execute(
			CustomReservationRepositoryImpl customReservationRepository, Long carId,
			ArrayList<String> selectedSidoArray, PageRequest pageRequest) {
			return customReservationRepository.findAllOrdersV2(carId, selectedSidoArray, pageRequest);
		}
	},
	FEE {
		@Override
		public List<Reservation> execute(
			CustomReservationRepositoryImpl customReservationRepository, Long carId,
			ArrayList<String> selectedSidoArray, PageRequest pageRequest) {
			return customReservationRepository.findAllOrderByFeeV2(carId, selectedSidoArray, pageRequest);
		}
	},
	DATETIME {
		@Override
		public List<Reservation> execute(
			CustomReservationRepositoryImpl customReservationRepository, Long carId,
			ArrayList<String> selectedSidoArray, PageRequest pageRequest) {
			return customReservationRepository.findAllOrderByDateTimeV2(carId, selectedSidoArray, pageRequest);
		}
	};

	public abstract List<Reservation> execute(
		CustomReservationRepositoryImpl customReservationRepository, Long carId, ArrayList<String> selectedSidoArray,
		PageRequest pageRequest);

	public static OrderFilterV2 findFilter(String sort) {
		sort = sort.toUpperCase();
		if (!Arrays.toString(values()).contains(sort)) {
			throw new BadRequestException(ErrorCode.UNSUPPORTED_QUERY_VALUE);
		}
		return valueOf(sort);
	}

}

