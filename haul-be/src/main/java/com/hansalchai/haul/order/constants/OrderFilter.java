package com.hansalchai.haul.order.constants;

import java.util.List;

import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

public enum OrderFilter {

	DEFAULT {
		@Override
		public List<Reservation> execute(ReservationRepository reservationRepository, Long carId) {
			return reservationRepository.findAllOrders(carId);
		}
	},
	FEE {
		@Override
		public List<Reservation> execute(ReservationRepository reservationRepository, Long carId) {
			return reservationRepository.findAllOrderByFee(carId);
		}
	},
	DATETIME {
		@Override
		public List<Reservation> execute(ReservationRepository reservationRepository, Long carId) {
			return reservationRepository.findAllOrderByDateTime(carId);
		}
	};

	public abstract List<Reservation> execute(ReservationRepository reservationRepository, Long carId);

	public static OrderFilter findFilter(String sort) {
		return valueOf(sort.toUpperCase());
	}
}
