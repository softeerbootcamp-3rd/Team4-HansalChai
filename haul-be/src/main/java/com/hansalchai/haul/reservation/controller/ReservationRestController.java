package com.hansalchai.haul.reservation.controller;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ApiResponse.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.service.ReservationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReservationRestController {
	private final ReservationService reservationService;

	@PostMapping("/reservations")
	public ResponseEntity<ApiResponse<ReservationResponse.ReservationRecommendationDTO>> customerReservation(
		@Valid @RequestBody ReservationRequest.CreateReservationDTO reservationDTO,
		HttpServletRequest request
	) {
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ReservationResponse.ReservationRecommendationDTO response = reservationService.createReservation(reservationDTO, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@PostMapping("/reservations/guest")
	public ResponseEntity<ApiResponse<ReservationResponse.ReservationRecommendationDTO>> guestReservation(
		@Valid @RequestBody ReservationRequest.CreateReservationGuestDTO reservationDTO
	) {
		ReservationResponse.ReservationRecommendationDTO response = reservationService.createGuestReservation(reservationDTO);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}
}
