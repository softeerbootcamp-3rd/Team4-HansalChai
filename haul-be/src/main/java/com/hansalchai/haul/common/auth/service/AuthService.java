package com.hansalchai.haul.common.auth.service;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.auth.jwt.Jwt;
import com.hansalchai.haul.common.auth.jwt.JwtProvider;
import com.hansalchai.haul.user.entity.Users;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthService {

	private final JwtProvider jwtProvider;
	private final ObjectMapper objectMapper;

	public Jwt createJwt(Users user) throws JsonProcessingException {

		// claim 생성
		Map<String, Object> claims = new HashMap<>();
		AuthenticatedUser authenticateUser = new AuthenticatedUser(user);
		String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
		claims.put(AUTHENTICATE_USER, authenticateUserJson);

		// 토큰 생성
		return jwtProvider.createJwt(claims);
	}
}
