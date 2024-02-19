package com.hansalchai.haul.common.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.ErrorCode;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FilterExceptionHandler {

	// 토큰에 대한 오류가 발생했을 때, 커스터마이징해서 Exception 처리 값을 클라이언트에게 알려준다.
	public static void sendError(HttpServletResponse response, ErrorCode errorCode) {

		response.setStatus(errorCode.getStatus().value());
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		try {
			String json = new ObjectMapper().writeValueAsString(ApiResponse.error(errorCode));
			response.getWriter().write(json);
		} catch (Exception e) {
			log.info(e.getMessage());
		}
	}
}
