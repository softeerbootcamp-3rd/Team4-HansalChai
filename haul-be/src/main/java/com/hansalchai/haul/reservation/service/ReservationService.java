package com.hansalchai.haul.reservation.service;

import org.springframework.stereotype.Service;

import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.entity.Cargo;
import com.hansalchai.haul.reservation.entity.CargoOption;
import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Source;
import com.hansalchai.haul.reservation.entity.Transport;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ReservationService{
	private final OwnerRepository ownerRepository;
	/*
	1. 예약 dto에서 받아온 데이터로
	2. 트럭을 선택
	3. 예약을 생성 후 데이터 반환
	 */
	public ReservationResponse.ReservationRecommendationDTO createReservation(ReservationRequest.CreateReservationDTO request) {

		Source source = request.getSrc().build();
		Destination destination = request.getDst().build();
		Cargo cargo = request.getCargo().build();
		CargoOption cargoOption = request.getCargoOption().build();

		//TODO Transport, Reservation 생성후 repository저장
		//TODO Response 객체 생성후 반환



		return null;
	}
}