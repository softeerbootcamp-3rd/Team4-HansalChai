package com.hansalchai.haul.user.controller;

import static com.hansalchai.haul.common.utils.ApiResponse.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hansalchai.haul.common.auth.anotation.LoggedInUser;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.dto.ProfileDTO;
import com.hansalchai.haul.user.dto.ProfileUpdateDTO;
import com.hansalchai.haul.user.dto.UserLogin;
import com.hansalchai.haul.user.service.UsersService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class UsersController {

	private final UsersService usersService;
	private static final String V1_USERS_PATH = "/api/v1/users";
	private static final String V2_USERS_PATH = "/api/v2/users";

	@PostMapping(V1_USERS_PATH + "/sign-up")
	public ResponseEntity<ApiResponse<Object>> signUp(
		@Valid @RequestBody CustomerSignUpDto signUpDto) {
		usersService.signUp(signUpDto);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, null));
	}

	@PostMapping(V1_USERS_PATH + "/sign-in")
	public ResponseEntity<ApiResponse<UserLogin.ResponseDto>> signIn(
		@Valid @RequestBody UserLogin.RequestDto requestDto) throws JsonProcessingException {
		UserLogin.ResponseDto responseDto = usersService.signIn(requestDto);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, responseDto));
	}

	@GetMapping(V1_USERS_PATH + "/profile")
	public ResponseEntity<ApiResponse<ProfileDTO>> getProfile(
		@LoggedInUser AuthenticatedUser authenticatedUser) {
		ProfileDTO profileDTO = usersService.getProfile(authenticatedUser.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, profileDTO));
	}

	@PutMapping(V1_USERS_PATH + "/profile")
	public ResponseEntity<ApiResponse<String>> putProfile(
		@LoggedInUser AuthenticatedUser authenticatedUser,
		@Valid @RequestBody ProfileUpdateDTO profileUpdateDTO) {
		usersService.putProfile(profileUpdateDTO, authenticatedUser.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, null));
	}

	@PostMapping(V2_USERS_PATH + "/customers/sign-in")
	public ResponseEntity<ApiResponse<UserLogin.ResponseDto>> customerSignInV2(
		@Valid @RequestBody UserLogin.RequestDto requestDto) throws JsonProcessingException {
		UserLogin.ResponseDto responseDto = usersService.customerSignInV2(requestDto);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, responseDto));
	}

	@PostMapping(V2_USERS_PATH + "/drivers/sign-in")
	public ResponseEntity<ApiResponse<UserLogin.ResponseDto>> driverSignInV2(
		@Valid @RequestBody UserLogin.RequestDto requestDto) throws JsonProcessingException {
		UserLogin.ResponseDto responseDto = usersService.driverSignInV2(requestDto);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, responseDto));
	}
}
