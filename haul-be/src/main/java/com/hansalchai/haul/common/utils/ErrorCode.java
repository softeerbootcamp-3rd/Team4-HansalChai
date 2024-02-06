package com.hansalchai.haul.common.utils;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public enum ErrorCode {
	/* 400 BAD REQUEST */
	// general
	NO_ID(BAD_REQUEST, "40001", "존재하지 않는 id 입니다");

	private final HttpStatus status;
	private final String code;
	private final String message;

	ErrorCode(HttpStatus status, String code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}


}