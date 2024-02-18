package com.hansalchai.haul.user.controller;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ApiResponse.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.dto.ProfileDTO;
import com.hansalchai.haul.user.dto.ProfileUpdateDTO;
import com.hansalchai.haul.user.dto.UserLogin;
import com.hansalchai.haul.user.service.UsersService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UsersController {

	private final UsersService usersService;

	@PostMapping("/sign-up")
	public ResponseEntity<ApiResponse<String>> signUp(@Valid @RequestBody CustomerSignUpDto signUpDto) {
		usersService.signUp(signUpDto);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, null));
	}

	@PostMapping("/sign-in")
	public ResponseEntity<ApiResponse<UserLogin.ResponseDto>> signIn(
			@Valid @RequestBody UserLogin.RequestDto requestDto) throws JsonProcessingException {
		UserLogin.ResponseDto responseDto = usersService.signIn(requestDto);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, responseDto));
	}

	@GetMapping("/profile")
	public ResponseEntity<ApiResponse<ProfileDTO>> getProfile(HttpServletRequest request) {
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ProfileDTO profileDTO = usersService.getProfile(auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, profileDTO));
	}

	@PutMapping("/profile")
	public ResponseEntity<ApiResponse<String>> putProfile(@Valid @RequestBody ProfileUpdateDTO profileUpdateDTO, HttpServletRequest request) {
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		usersService.putProfile(profileUpdateDTO, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, null));
	}
}
