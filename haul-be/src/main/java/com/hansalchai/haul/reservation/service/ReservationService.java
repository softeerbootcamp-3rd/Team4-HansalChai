package com.hansalchai.haul.reservation.service;

import org.springframework.stereotype.Service;

import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ReservationService{

	public ReservationResponse.ReservationRecommendationDTO createReservation(ReservationRequest.CreateReservationDTO request) {
		return null;
	}
}