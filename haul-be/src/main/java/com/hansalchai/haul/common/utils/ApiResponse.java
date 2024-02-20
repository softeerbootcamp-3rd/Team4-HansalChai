package com.hansalchai.haul.common.utils;

import lombok.Getter;

@Getter
public class ApiResponse<T> {
	private int status;
	private int code;
	private String message;
	private T data;

	private static final int SUCCESS_CODE = 200;

	private ApiResponse(int status, int code, String message, T data){
		this.status = status;
		this.code = code;
		this.message = message;
		this.data = data;
	}

	private static <T> ApiResponse<T> ApiResponseSuccess(int status, String message, T data) {
		return new ApiResponse<>(status, SUCCESS_CODE, message, data);
	}

	private static <T> ApiResponse<T> ApiResponseError(int status, int code ,String message) {
		return new ApiResponse<>(status, code, message, null);
	}

	public static <T> ApiResponse<T> success(SuccessCode code, T data) {
		return ApiResponseSuccess(code.getStatus().value(), code.getMessage(), data);
	}

	public static <T> ApiResponse<T> error(ErrorCode code) {
		return ApiResponseError(code.getStatus().value(), code.getCode() ,code.getMessage());
	}
}
