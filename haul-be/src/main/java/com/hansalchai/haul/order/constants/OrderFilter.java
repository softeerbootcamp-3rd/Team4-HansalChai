package com.hansalchai.haul.order.constants;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

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
		return valueOf(sort.toUpperCase());
	}
}
