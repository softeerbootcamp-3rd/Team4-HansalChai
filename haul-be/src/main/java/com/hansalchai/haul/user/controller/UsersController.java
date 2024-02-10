package com.hansalchai.haul.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.service.UsersService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UsersController {

	private final UsersService usersService;

	@PostMapping("/signup")
	public ResponseEntity<ApiResponse<String>> signUp(@Valid @RequestBody CustomerSignUpDto signUpDto) {
		usersService.signUp(signUpDto);
		return ResponseEntity.ok(ApiResponse.success(SuccessCode.GET_SUCCESS, null));
	}
}
