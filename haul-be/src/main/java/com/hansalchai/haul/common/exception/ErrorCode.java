package com.hansalchai.haul.common.exception;

import java.io.Serializable;

import lombok.Getter;

@Getter
public class ErrorCode implements Serializable {
	private final String code;
	private final String message;

	ErrorCode(String code, String message) {
		this.code = code;
		this.message = message;
	}
}