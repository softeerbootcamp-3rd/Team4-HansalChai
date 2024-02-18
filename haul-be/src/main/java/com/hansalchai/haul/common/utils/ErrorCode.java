package com.hansalchai.haul.common.utils;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	/* 400 BAD REQUEST */
	// general
	NO_ID(BAD_REQUEST, "40001", "존재하지 않는 id 입니다"),
	MethodArgumentNotValidException(BAD_REQUEST,"20002002","MethodArgumentNotValidException"),

	// 토큰, 유저
	TOKEN_NOT_FOUND(UNAUTHORIZED, "2001", "요청 헤더에 토큰이 없습니다."),
	INVALID_TOKEN(UNAUTHORIZED, "2002", "토큰 유효성 검증에 실패했습니다."),
	EXPIRED_TOKEN(UNAUTHORIZED, "2003", "토큰이 만료되었습니다."),
	ACCOUNT_ALREADY_EXISTS(CONFLICT, "2004", "이미 가입된 전화번호입니다."),
	UNREGISTERED_USER_ID(UNAUTHORIZED, "2005", "존재하지 않는 아이디입니다."),
	USER_NOT_FOUND(NOT_FOUND, "2006", "사용자를 찾을 수 없습니다."),
	INCORRECT_PASSWORD(UNAUTHORIZED, "2007", "비밀번호가 일치하지 않습니다.");

	private final HttpStatus status;
	private final String code;
	private final String message;

	ErrorCode(HttpStatus status, String code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}


}
