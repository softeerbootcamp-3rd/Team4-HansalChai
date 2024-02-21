package com.hansalchai.haul.common.auth.config;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;

import java.io.IOException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
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
		if (request.getAttribute(AUTHENTICATE_USER) != null) {
			AuthenticatedUser authenticateUser = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
			Role role = authenticateUser.getRole();
			String baseUrl = getBaseUrl(handler);

			if (baseUrl == null) {
				throw new NotFoundException(ErrorCode.PAGE_NOT_FOUND);
			}

			// url에 대한 접근 권한 확인
			if (hasAuthority(baseUrl, role)) {
				return true;
			}
		}
		throw new UnauthorizedException(ErrorCode.INVALID_TOKEN);
	}

	private static String getBaseUrl(Object handler) {
		if (handler instanceof HandlerMethod handlerMethod) { //호출할 컨트롤러 메서드의 모든 정보가 포함되어 있음
			return handlerMethod.getMethod().getDeclaringClass().getAnnotation(RequestMapping.class).value()[0];
		}
		return null;
	}

	private boolean hasAuthority(String url, Role role) {
		if ((role.equals(Role.CUSTOMER) && url.endsWith(DRIVER_URL))
			|| (role.equals(Role.DRIVER) && url.endsWith(CUSTOMER_URL))) {
			return false;
		}
		return true;
	}
}
