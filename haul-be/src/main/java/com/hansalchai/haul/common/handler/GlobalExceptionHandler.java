package com.hansalchai.haul.common.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.common.exceptions.GeneralException;
import com.hansalchai.haul.common.exceptions.NotFoundException;
import com.hansalchai.haul.common.exceptions.UnauthorizedException;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.ErrorCode;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(GeneralException.class)
	protected ApiResponse handleCustomException(GeneralException exception, HttpServletRequest request) {
		logInfo(request, exception.getCode().getStatus(), exception.getCode().getMessage());
		return ApiResponse.error(exception.getCode());
	}

	// @RequestBody valid 에러
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	protected ApiResponse handleMethodArgNotValidException(MethodArgumentNotValidException exception,
		HttpServletRequest request) {
		String message = exception.getBindingResult().getAllErrors().get(0).getDefaultMessage();
		logInfo(request, HttpStatus.BAD_REQUEST, message);
		return ApiResponse.error(ErrorCode.MethodArgumentNotValidException);
	}

	//401 Unauthorized
	@ExceptionHandler(UnauthorizedException.class)
	protected ApiResponse<Object> handleUnauthorizedException(
			UnauthorizedException exception,
			HttpServletRequest request) {
		logInfo(request, HttpStatus.UNAUTHORIZED, exception.getMessage());
		return ApiResponse.error(exception.getCode());
	}

	//404 Not Found
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NotFoundException.class)
	protected ApiResponse<Object> handleNotFoundException(
			NotFoundException exception,
			HttpServletRequest request) {
		logInfo(request, HttpStatus.NOT_FOUND, exception.getMessage());
		return ApiResponse.error(exception.getCode());
	}

	// 409 Conflict
	@ExceptionHandler(ConflictException.class)
	protected ApiResponse<Object> handleConflictException(
			ConflictException exception,
			HttpServletRequest request) {
		logInfo(request, HttpStatus.CONFLICT, exception.getMessage());
		return ApiResponse.error(exception.getCode());
	}

	private void logInfo(HttpServletRequest request, HttpStatus status, String message) {
		String logMessage = String.format("%s %s : %s - %s", request.getMethod(), request.getRequestURI(), status, message);
		logger.info(logMessage);
	}
}
