package com.hansalchai.haul.common.exceptions;

import com.hansalchai.haul.common.utils.ErrorCode;

import lombok.Getter;

@Getter
public class InternalServerError extends RuntimeException{
	private final ErrorCode code;

	public InternalServerError(ErrorCode code) {
		super(code.getMessage());
		this.code = code;
	}
}
