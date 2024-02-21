package com.hansalchai.haul.reservation.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hansalchai.haul.reservation.entity.Reservation;

public interface CustomReservationRepository {
	public Long countAllOrdersQdsl(Long carId, ArrayList<String> sidoArray);

	public Long countAllOrderByFeeQdsl(Long carId, ArrayList<String> sidoArray);

	Long countAllOrderByDateTimeQdsl(Long carId, ArrayList<String> sidoArray);

	List<Reservation> findAllOrdersV2(Long carId, ArrayList<String> sidoArray, Pageable pageable);

	List<Reservation> findAllOrderByFeeV2(Long carId, ArrayList<String> sidoArray, Pageable pageable);

	List<Reservation> findAllOrderByDateTimeV2(Long carId, ArrayList<String> sidoArray, Pageable pageable);
}
