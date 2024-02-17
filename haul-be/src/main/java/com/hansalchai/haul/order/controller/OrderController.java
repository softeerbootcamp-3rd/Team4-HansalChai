package com.hansalchai.haul.order.controller;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ApiResponse.*;
import static com.hansalchai.haul.common.utils.SuccessCode.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.dto.OrderResponse;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDTO;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDetailDTO;
import com.hansalchai.haul.order.service.OrderService;
import com.hansalchai.haul.reservation.dto.ReservationResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {

	private final OrderService orderService;

	@PatchMapping("/approve")
	public ResponseEntity approveOrder(HttpServletRequest request,
		@Valid @RequestBody ApproveRequestDto approveRequestDto) {

		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		orderService.approve(auth.getUserId(), approveRequestDto);
		return ResponseEntity.ok(success(GET_SUCCESS, null));
	}

	@GetMapping("/mine")
	public ResponseEntity<ApiResponse<OrderDTO>> getMyOrder(@RequestParam(value = "page", defaultValue = "0") int page, HttpServletRequest request){
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		OrderDTO response = orderService.getOrder(page, auth.getUserId());
		return ResponseEntity.ok(success(GET_SUCCESS, response));
	}

	@GetMapping("/mine/{id}")
	public ResponseEntity<ApiResponse<OrderDetailDTO>> getMyOrderDetauk(@PathVariable("id")Long id, HttpServletRequest request){
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		OrderDetailDTO response = orderService.getOrderDetail(id, auth.getUserId());
		return ResponseEntity.ok(success(GET_SUCCESS, response));
	}
}
