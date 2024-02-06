package com.hansalchai.haul.common.utils;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum SuccessCode {
	/* 200 OK */
	GET_SUCCESS(OK, "조회 성공");

	private final HttpStatus status;
	private final String message;

	SuccessCode(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}
}
