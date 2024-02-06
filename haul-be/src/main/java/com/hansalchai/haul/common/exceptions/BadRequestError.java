package com.hansalchai.haul.common.exceptions;

import org.springframework.http.HttpStatus;

import com.hansalchai.haul.common.exceptions.ApiException;

import lombok.Getter;

// HTTP 상태 코드 400 Bad Request : 잘못된 요청
@Getter
public class BadRequestError extends ApiException {
	public BadRequestError(ErrorCode errorCode, String message) {
		super(errorCode, message, HttpStatus.BAD_REQUEST);
	}

	public enum ErrorCode implements ApiException.ErrorCode {
		VALIDATION_FAILED(1001, "Request Validation Failed");

		private final int code;
		private final String message;

		ErrorCode(int code, String message) {
			this.code = code;
			this.message = message;
		}

		@Override
		public int getCode() {
			return code;
		}

		@Override
		public String getMessage() {
			return message;
		}
	}
}