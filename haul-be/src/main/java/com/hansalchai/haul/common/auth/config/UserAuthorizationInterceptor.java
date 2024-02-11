package com.hansalchai.haul.common.auth.config;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;

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
				response.sendError(HttpStatus.NOT_FOUND.value(), "요청한 페이지를 찾을 수 없음");
				return false;
			}

			// url에 대한 접근 권한 확인
			if (hasAuthority(baseUrl, role)) {
				return true;
			}
		}
		response.sendError(HttpStatus.UNAUTHORIZED.value(), "엑세스 권한 없음");
		return false;
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
