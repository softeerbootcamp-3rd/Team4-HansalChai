package com.hansalchai.haul.common.exceptions;

import com.hansalchai.haul.common.utils.ErrorCode;

import lombok.Getter;

// HTTP 상태 코드 400 Bad Request : 잘못된 요청
@Getter
public class BadRequestException extends RuntimeException {
	private final ErrorCode code;
	public BadRequestException(ErrorCode code) {
		super(code.getMessage());
		this.code = code;
	}
}