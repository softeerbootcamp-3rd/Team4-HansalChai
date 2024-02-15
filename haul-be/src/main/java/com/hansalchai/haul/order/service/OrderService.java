package com.hansalchai.haul.order.service;

import org.springframework.stereotype.Service;

import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {

	private final ReservationRepository reservationRepository;
	private final OwnerRepository ownerRepository;

	@Transactional
	public void approve(Long driverId, ApproveRequestDto approveRequestDto) {

		// 1. 예약 정보 가져오기
		Reservation reservation = reservationRepository.findById(approveRequestDto.getReservationId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 예약번호입니다."));

		// 2. 기사 정보 가져오기
		Owner owner = ownerRepository.findByDriverIdAndCarId(driverId, approveRequestDto.getCarId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 owner입니다."));

		// 3. 예약에 기사 배정 정보 저장
		reservation.setDriver(owner);

		// TODO : 해당 예약을 만든 고객에게 sms로 기사 배정 정보 전송
	}
}
