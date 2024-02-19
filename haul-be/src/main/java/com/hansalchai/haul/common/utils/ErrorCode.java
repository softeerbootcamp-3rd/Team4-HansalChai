package com.hansalchai.haul.common.utils;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {

	//공통
	PAGE_NOT_FOUND(NOT_FOUND, "1003", "요청한 페이지를 찾을 수 없습니다."),
	UNAUTHORIZED_ACCESS(UNAUTHORIZED, "1004", "리소스 접근 권한이 없습니다."),
	UNSUPPORTED_QUERY_VALUE(BAD_REQUEST, "1008", "지원하지 않는 쿼리스트링 값입니다."),

	// 토큰, 유저
	TOKEN_NOT_FOUND(UNAUTHORIZED, "2001", "요청 헤더에 토큰이 없습니다."),
	INVALID_TOKEN(UNAUTHORIZED, "2002", "토큰 유효성 검증에 실패했습니다."),
	EXPIRED_TOKEN(UNAUTHORIZED, "2003", "토큰이 만료되었습니다."),
	INVALID_JWT_SIGNATURE(UNAUTHORIZED, "2004", "JWT 서명이 유효하지 않습니다"),
	UNSUPPORTED_JWT_TOKEN(UNAUTHORIZED, "2005", "지원되지 않는 형식의 토큰입니다."),
	EMPTY_JWT(UNAUTHORIZED, "2006", "JWT Claim이 비어있습니다."),

	ACCOUNT_ALREADY_EXISTS(CONFLICT, "2007", "이미 가입된 전화번호입니다."),
	UNREGISTERED_USER_ID(UNAUTHORIZED, "2008", "존재하지 않는 아이디입니다."),
	USER_NOT_FOUND(NOT_FOUND, "2009", "사용자를 찾을 수 없습니다."),
	INCORRECT_PASSWORD(UNAUTHORIZED, "2010", "비밀번호가 일치하지 않습니다."),

	// 오더
	OWNER_NOT_FOUND(NOT_FOUND, "5002", "기사 정보를 찾을 수 없습니다."),
	RESERVATION_NOT_FOUND(NOT_FOUND, "5003", "예약 정보를 찾을 수 없습니다."),
	ALREADY_ASSIGNED_DRIVER(CONFLICT, "5004", "이미 드라이버가 배정된 예약입니다."),
	ALREADY_DELIVERED(CONFLICT, "5005", "이미 운송 완료된 오더입니다.");

	private final HttpStatus status;
	private final String code;
	private final String message;

	ErrorCode(HttpStatus status, String code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
}
