package com.hansalchai.haul.common.exceptions;

import java.io.Serializable;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {
	private final ErrorCode errorCode;
	private final String errors;
	private final HttpStatus status;

	public ApiException(ErrorCode errorCode, String errors, HttpStatus status) {
		this.errorCode = errorCode;
		this.errors = errors;
		this.status = status;
	}

	public interface ErrorCode extends Serializable {
		int getCode();

		String getMessage();
	}
}