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

	/*
	1. 예약 dto에서 받아온 데이터로
	2. 트럭을 선택
	3. 예약을 생성 후 데이터 반환
	 */
	public ReservationResponse.ReservationRecommendationDTO createReservation(ReservationRequest.CreateReservationDTO request) {
		return null;
	}
}