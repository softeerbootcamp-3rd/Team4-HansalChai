package com.hansalchai.haul.reservation.controller;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ApiResponse.*;
import static com.hansalchai.haul.reservation.dto.ReservationRequest.*;
import static com.hansalchai.haul.reservation.dto.ReservationResponse.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public ResponseEntity<ApiResponse<ReservationRecommendationDTO>> postCustomerReservation(
		@Valid @RequestBody CreateReservationDTO reservationDTO,
		HttpServletRequest request
	) {
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ReservationRecommendationDTO response = reservationService.createReservation(reservationDTO, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@PostMapping("/reservations/guest")
	public ResponseEntity<ApiResponse<ReservationRecommendationDTO>> postGuestReservation(
		@Valid @RequestBody CreateReservationGuestDTO reservationDTO
	) {
		ReservationRecommendationDTO response = reservationService.createGuestReservation(reservationDTO);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@GetMapping("/reservations")
	public ResponseEntity<ApiResponse<ReservationDTO>> getCustomerReservation(@RequestParam(value = "page", defaultValue = "0") int page, HttpServletRequest request){
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ReservationDTO response = reservationService.getReservation(page, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@GetMapping("/reservations/guest")
	public ResponseEntity<ApiResponse<ReservationDTO>> getGuestReservation(@RequestParam(value = "number") String number){
		ReservationDTO response = reservationService.getGuestReservation(number);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@GetMapping("/reservations/{id}")
	public ResponseEntity<ApiResponse<ReservationDetailDTO>> getCustomerReservationDetail(@PathVariable int id, HttpServletRequest request){
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ReservationDetailDTO response = reservationService.getReservationDetail(id, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

}
