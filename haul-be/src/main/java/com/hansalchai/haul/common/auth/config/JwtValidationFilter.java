package com.hansalchai.haul.common.auth.config;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.auth.constants.JwtExceptionType;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.auth.handler.FilterExceptionHandler;
import com.hansalchai.haul.common.auth.jwt.JwtProvider;
import com.hansalchai.haul.common.utils.ErrorCode;

import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtValidationFilter implements Filter {

	private final JwtProvider jwtProvider;
	private final ObjectMapper objectMapper;

	private final String[] whiteListUris
		= new String[] {"*/users*", "/auth/refresh/token", "*/h2-console*", "/swagger-ui/**", "*/api-docs*", "/api/v1/reservations/guest*"};

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException, ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;

		//http method가 preflight이면 토큰 유효성을 검증하지 않는다
		if (isPrefilghtRequest(httpServletRequest)) {
			chain.doFilter(request, response);
			return;
		}

		// 토큰 유효성을 검증하지 않아도 되는 경우
		if (whiteListCheck(httpServletRequest.getRequestURI())) {
			chain.doFilter(request, response);
			return;
		}

		// 요청 헤더에 토큰이 없는 경우
		if (!isContainToken(httpServletRequest)) {
			FilterExceptionHandler.sendError(httpServletResponse, ErrorCode.TOKEN_NOT_FOUND);
			return;
		}

		String accessToken = jwtProvider.resolveToken(httpServletRequest);
		JwtExceptionType jwtException = jwtProvider.validateToken(accessToken);

		if (jwtException == JwtExceptionType.VALID_JWT_TOKEN) {
			request.setAttribute(AUTHENTICATE_USER, getAuthenticateUser(accessToken));
		} else if (jwtException == JwtExceptionType.EXPIRED_JWT_TOKEN) {
			httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "토큰 만료");
			return;
		}

		chain.doFilter(request, response);
	}

	private boolean isPrefilghtRequest(HttpServletRequest request) {
		if (request.getMethod().equals("OPTIONS")) {
			return true;
		}
		return false;
	}

	private boolean whiteListCheck(String uri) {
		return PatternMatchUtils.simpleMatch(whiteListUris, uri);
	}

	private boolean isContainToken(HttpServletRequest request) {
		String authorization = request.getHeader(AUTHORIZATION_HEADER);
		return authorization != null && authorization.startsWith(BEARER_TOKEN_PREFIX);
	}

	private AuthenticatedUser getAuthenticateUser(String token) throws JsonProcessingException {
		Claims claims = jwtProvider.getClaims(token);
		String authenticateUserJson = claims.get(AUTHENTICATE_USER, String.class);
		return objectMapper.readValue(authenticateUserJson, AuthenticatedUser.class);
	}
}
