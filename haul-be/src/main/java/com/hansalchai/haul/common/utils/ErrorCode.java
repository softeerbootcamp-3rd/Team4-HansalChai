package com.hansalchai.haul.common.utils;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {

	//공통
	PAGE_NOT_FOUND(NOT_FOUND, 1001, "요청한 페이지를 찾을 수 없습니다."),
	UNAUTHORIZED_ACCESS(FORBIDDEN, 1002, "리소스 접근 권한이 없습니다."),
	UNSUPPORTED_QUERY_VALUE(BAD_REQUEST, 1003, "지원하지 않는 쿼리스트링 값입니다."),

	//Not Found
	USER_NOT_FOUND(NOT_FOUND, 1101, "사용자를 찾을 수 없습니다."),
	OWNER_NOT_FOUND(NOT_FOUND, 1102, "기사 정보를 찾을 수 없습니다."),
	RESERVATION_NOT_FOUND(NOT_FOUND, 1103, "예약 정보를 찾을 수 없습니다."),
	CAR_NOT_FOUND(NOT_FOUND, 1104, "해당하는 자동차를 찾을 수 없습니다."),
	ORDER_NOT_FOUND(NOT_FOUND, 1105, "해당하는 주문을 찾을 수 없습니다."),

	//DB Error
	USER_NOT_SAVED(INTERNAL_SERVER_ERROR, 1201, "사용자가 저장 되지 않았습니다."),
	RESERVATION_NOT_SAVED(INTERNAL_SERVER_ERROR, 1202, "예약이 저장 되지 않았습니다."),

	// 토큰, 유저
	TOKEN_NOT_FOUND(UNAUTHORIZED, 2001, "요청 헤더에 토큰이 없습니다."),
	INVALID_TOKEN(UNAUTHORIZED, 2002, "토큰 유효성 검증에 실패했습니다."),
	EXPIRED_TOKEN(UNAUTHORIZED, 2003, "토큰이 만료되었습니다."),
	ACCOUNT_ALREADY_EXISTS(CONFLICT, 2004, "이미 가입된 전화번호입니다."),
	UNREGISTERED_USER_ID(UNAUTHORIZED, 2005, "존재하지 않는 아이디입니다."),
	INCORRECT_PASSWORD(UNAUTHORIZED, 2006, "비밀번호가 일치하지 않습니다."),

	//예약
	INVALID_RESERVATION_STATE_CHANGE (FORBIDDEN, 3001, "관리자 권한이 아닐 경우 예약 전 상태에서만 상태를 변경할 수 있습니다."),
	KAKAO_MAP_ERROR(INTERNAL_SERVER_ERROR,3002, "카카오 지도에 오류가 있습니다."),

	// 오더
	ALREADY_ASSIGNED_DRIVER(CONFLICT, 4001, "이미 드라이버가 배정된 예약입니다."),
	ALREADY_DELIVERED(CONFLICT, 4002, "이미 운송 완료된 오더입니다."),
	SCHEDULE_CONFLICT(CONFLICT, 4003, "해당 오더와 시간이 겹치는 다른 오더가 있습니다.");



	private final HttpStatus status;
	private final int code;
	private final String message;

	ErrorCode(HttpStatus status, int code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
}
