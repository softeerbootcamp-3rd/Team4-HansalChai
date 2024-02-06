package com.hansalchai.haul.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class ApiUtils {
	private static final Logger logger = LoggerFactory.getLogger(ApiUtils.class);

	@Getter
	@Setter
	@AllArgsConstructor
	public static class ApiResult<T> {
		private final boolean success;
		private final T response;
		private final ApiError error;

		@Override
		public String toString() {
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				return objectMapper.writeValueAsString(this);
			} catch (JsonProcessingException e) {
				logger.error("Error : Generating Json Response");
				return "{\"success\":false,\"response\":null,\"error\":{\"message\":\"Error : Generating Json Response\"}}";
			}
		}
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class ApiError {
		private final String status;
		private final String code;
		private final String message;
	}

	public static <T> ApiResult<T> success(T response) {
		return new ApiResult<>(true, response, null);
	}

	public static <T> ApiResult<T> error(String status, String code, String message) {
		return new ApiResult<>(false, null, new ApiError(status, code, message));
	}
}
