package com.hansalchai.haul.reservation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.reservation.dto.ReservationRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReservationRestController {
	private final ReservationService reservationService;

	@PostMapping("/reservations")
	public ResponseEntity<?> customerReservation(
		@Valid @RequestBody ReservationRequest.Reservation reservation
	) {
		ReservationResponse.Reservation response = reservationService.createReservation(reservation);

		return ResponseEntity.ok(ApiResponse.success(SuccessCode.GET_SUCCESS, response));
	}
}
