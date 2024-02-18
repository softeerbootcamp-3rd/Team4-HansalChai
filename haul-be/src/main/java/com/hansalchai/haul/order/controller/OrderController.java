package com.hansalchai.haul.order.controller;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ApiResponse.*;
import static com.hansalchai.haul.common.utils.SuccessCode.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.dto.OrderSearchResponse;
import com.hansalchai.haul.order.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {

	private final OrderService orderService;

	@GetMapping("")
	public ResponseEntity<ApiResponse<OrderSearchResponse>> findAll(
			HttpServletRequest request,
			@RequestParam("sort") String sort,
			@PositiveOrZero @RequestParam("page") int page) {
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		OrderSearchResponse orders = orderService.findAll(auth.getUserId(), sort, page);
		return ResponseEntity.ok(success(GET_SUCCESS, orders));
	}

	@PatchMapping("/approve")
	public ResponseEntity<ApiResponse<Object>> approveOrder(HttpServletRequest request,
		@Valid @RequestBody ApproveRequestDto approveRequestDto) {

		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		orderService.approve(auth.getUserId(), approveRequestDto);
		return ResponseEntity.ok(success(GET_SUCCESS, null));
	}
}
