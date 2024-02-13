package com.hansalchai.haul.reservation.controller;

import static com.hansalchai.haul.common.utils.ApiResponse.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.service.ReservationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReservationRestController {
	private final ReservationService reservationService;

	@PostMapping("/reservations")
	public ResponseEntity<ApiResponse<ReservationResponse.ReservationRecommendationDTO>> customerReservation(
		@Valid @RequestBody ReservationRequest.CreateReservationDTO request
	) {
		ReservationResponse.ReservationRecommendationDTO response = reservationService.createReservation(request);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@PostMapping("/reservations/guest")
	public ResponseEntity<ApiResponse<ReservationResponse.ReservationRecommendationDTO>> guestReservation(
		@Valid @RequestBody ReservationRequest.CreateReservationGuestDTO request
	) {
		ReservationResponse.ReservationRecommendationDTO response = reservationService.createGuestReservation(request);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}
}
