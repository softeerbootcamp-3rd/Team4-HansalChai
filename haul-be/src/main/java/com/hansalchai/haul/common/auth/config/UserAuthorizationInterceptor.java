package com.hansalchai.haul.common.auth.config;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ErrorCode.*;

import java.io.IOException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.exceptions.ForbiddenException;
import com.hansalchai.haul.common.exceptions.NotFoundException;
import com.hansalchai.haul.common.exceptions.UnauthorizedException;
import com.hansalchai.haul.common.utils.ErrorCode;

import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class UserAuthorizationInterceptor implements HandlerInterceptor {

	private static final String CUSTOMER_URL = "/reservations";
	private static final String DRIVER_URL = "/orders";

	@Override
	public boolean preHandle(HttpServletRequest request, @Nonnull HttpServletResponse response, @Nonnull Object handler)
		throws IOException {

		if (isPrefilghtRequest(request)) {
			return true;
		}

		if (request.getAttribute(AUTHENTICATE_USER) != null) {
			AuthenticatedUser authenticateUser = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
			Role role = authenticateUser.getRole();
			String baseUrl = getBaseUrl(handler);

			if (baseUrl == null) {
				throw new NotFoundException(ErrorCode.PAGE_NOT_FOUND);
			}

			// url에 대한 접근 권한 확인
			if (!hasAuthority(baseUrl, role)) {
				throw new ForbiddenException(UNAUTHORIZED_ACCESS);
			}
			return true;
		}
		throw new UnauthorizedException(ErrorCode.INVALID_TOKEN);
	}

	private static String getBaseUrl(Object handler) {
		if (handler instanceof HandlerMethod handlerMethod) { //호출할 컨트롤러 메서드의 모든 정보가 포함되어 있음
			if (handlerMethod.getMethod().getAnnotation(GetMapping.class) != null) {
				return handlerMethod.getMethod().getAnnotation(GetMapping.class).value()[0];
			}
			if (handlerMethod.getMethod().getAnnotation(PostMapping.class) != null) {
				return handlerMethod.getMethod().getAnnotation(PostMapping.class).value()[0];
			}
			if (handlerMethod.getMethod().getAnnotation(PutMapping.class) != null) {
				return handlerMethod.getMethod().getAnnotation(PutMapping.class).value()[0];
			}
			if (handlerMethod.getMethod().getAnnotation(PatchMapping.class) != null) {
				return handlerMethod.getMethod().getAnnotation(PatchMapping.class).value()[0];
			}
			if (handlerMethod.getMethod().getAnnotation(DeleteMapping.class) != null) {
				return handlerMethod.getMethod().getAnnotation(DeleteMapping.class).value()[0];
			}
		}
		return null;
	}

	private boolean hasAuthority(String url, Role role) {
		if ((role.equals(Role.CUSTOMER) && url.contains(DRIVER_URL))
			|| (role.equals(Role.DRIVER) && url.contains(CUSTOMER_URL))) {
			return false;
		}
		return true;
	}

	private boolean isPrefilghtRequest(HttpServletRequest request) {
		if (request.getMethod().equals("OPTIONS")) {
			return true;
		}
		return false;
	}
}
