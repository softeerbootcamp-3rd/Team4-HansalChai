package com.hansalchai.haul.order.controller;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ApiResponse.*;
import static com.hansalchai.haul.common.utils.SuccessCode.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {

	private final OrderService orderService;

	@PutMapping("/approve")
	public ResponseEntity approveOrder(HttpServletRequest request, @Valid @RequestBody ApproveRequestDto approveRequestDto) {
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		orderService.approve(auth.getUserId(), approveRequestDto);
		return ResponseEntity.ok(success(GET_SUCCESS, null));
	}
}
