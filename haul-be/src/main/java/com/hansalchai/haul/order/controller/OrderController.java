package com.hansalchai.haul.order.controller;

import static com.hansalchai.haul.common.utils.ApiResponse.*;
import static com.hansalchai.haul.common.utils.SuccessCode.*;
import static com.hansalchai.haul.order.dto.OrderRequest.*;
import static com.hansalchai.haul.order.dto.OrderResponse.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.auth.anotation.LoggedInUser;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.order.facade.OptimisticLockOrderFacade;
import com.hansalchai.haul.order.service.OrderService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class OrderController {

	private final OrderService orderService;
	private final OptimisticLockOrderFacade optimisticLockOrderFacade;
	private static final String V1_ORDERS_PATH = "/api/v1/orders";
	private static final String V2_ORDERS_PATH = "/api/v2/orders";

	@GetMapping(V1_ORDERS_PATH)
	public ResponseEntity<ApiResponse<OrderSearchResponseDto>> findAll(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@RequestParam(value = "sort", defaultValue = "default") String sort,
		@PositiveOrZero @RequestParam(value = "page", defaultValue = "0") int page) {
		OrderSearchResponseDto orders = orderService.findAll(authenticatedUser.getUserId(), sort, page);
		return ResponseEntity.ok(success(GET_SUCCESS, orders));
	}

	@GetMapping(V1_ORDERS_PATH + "/{id}")
	public ResponseEntity<ApiResponse<OrderDetailDTO>> findById(
		@PathVariable("id") Long id) {
		OrderDetailDTO response = orderService.getOrderDetail(id);
		return ResponseEntity.ok(success(GET_SUCCESS, response));
	}

	@PatchMapping(V1_ORDERS_PATH + "/approve")
	public ResponseEntity<ApiResponse<Object>> approveOrder(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@Valid @RequestBody ApproveRequestDto approveRequestDto) {
		orderService.approve(authenticatedUser.getUserId(), approveRequestDto);
		return ResponseEntity.ok(success(GET_SUCCESS, null));
	}

	@GetMapping(V1_ORDERS_PATH + "/mine")
	public ResponseEntity<ApiResponse<OrderDTO>> getMyOrder(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@RequestParam(value = "keyword", defaultValue = "운송 전") String keyword,
		@RequestParam(value = "page", defaultValue = "0") int page) {
		OrderDTO response = orderService.getOrder(keyword, page, authenticatedUser.getUserId());
		return ResponseEntity.ok(success(GET_SUCCESS, response));
	}

	@GetMapping(V1_ORDERS_PATH + "/mine/{id}")
	public ResponseEntity<ApiResponse<OrderDetailDTO>> getMyOrderDetail(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@PathVariable("id") Long id) {
		OrderDetailDTO response = orderService.getOrderMineDetail(id, authenticatedUser.getUserId());
		return ResponseEntity.ok(success(GET_SUCCESS, response));
	}

	@PatchMapping(V1_ORDERS_PATH + "/status")
	public ResponseEntity<ApiResponse<TransportStatusChangeResponseDto>> changeTransportStatus(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@Valid @RequestBody TransportStatusChangeRequestDto requestDto) {
		TransportStatusChangeResponseDto responseDto
			= orderService.changeTransportStatus(authenticatedUser.getUserId(), requestDto);
		return ResponseEntity.ok(success(GET_SUCCESS, responseDto));
	}

	@GetMapping(V2_ORDERS_PATH)
	public ResponseEntity<ApiResponse<OrderSearchResponseDto>> findAllV2(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@RequestParam(value = "sort", defaultValue = "default") String sort,
		@PositiveOrZero @RequestParam(value = "page", defaultValue = "0") int page,
		@RequestParam(value = "latitude") double latitude,
		@RequestParam(value = "longitude") double longitude) {
		OrderSearchResponseDto orders = orderService.findAllV2(authenticatedUser.getUserId(), sort, page, latitude,
			longitude);
		return ResponseEntity.ok(success(GET_SUCCESS, orders));
	}

	@PatchMapping(V2_ORDERS_PATH + "/approve")
	public ResponseEntity<ApiResponse<Object>> approveOrderV2(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@Valid @RequestBody ApproveRequestDto approveRequestDto) throws InterruptedException {
		optimisticLockOrderFacade.approveV2(authenticatedUser.getUserId(), approveRequestDto);
		return ResponseEntity.ok(success(GET_SUCCESS, null));
	}

	@PatchMapping(V2_ORDERS_PATH + "/status")
	public ResponseEntity<ApiResponse<TransportStatusChangeResponseDtoV2>> changeTransportStatusV2(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@Valid @RequestBody TransportStatusChangeRequestDtoV2 requestDto) {
		TransportStatusChangeResponseDtoV2 responseDto = orderService.changeTransportStatusV2(
			authenticatedUser.getUserId(), requestDto);
		return ResponseEntity.ok(success(GET_SUCCESS, responseDto));
	}
}
