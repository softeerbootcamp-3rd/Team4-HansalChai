package com.hansalchai.haul.customer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.customer.dto.CustomerSignUpDto;
import com.hansalchai.haul.customer.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/customers")
@RestController
public class CustomerController {

	private final CustomerService customerService;

	@PostMapping("/signup")
	public ResponseEntity<ApiResponse<String>> signUp(@Valid @RequestBody CustomerSignUpDto signUpDto) {
		customerService.signUp(signUpDto);
		return ResponseEntity.ok(ApiResponse.success(SuccessCode.GET_SUCCESS, null));
	}
}
