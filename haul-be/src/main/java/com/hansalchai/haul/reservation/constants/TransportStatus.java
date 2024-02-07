package com.hansalchai.haul.reservation.constants;

import java.util.Collections;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.Getter;

@Getter
public enum TransportStatus {
	PENDING("pending"),
	NOT_STARTED("not_started"),
	IN_PROGRESS("in_progress"),
	DONE("done");

	private final String code;
	TransportStatus(String code) {
		this.code = code;
	}

	private static final Map<String, TransportStatus> descriptions = Collections.unmodifiableMap(
		Stream.of(values()).collect(Collectors.toMap(TransportStatus::getCode, Function.identity())));

	public static TransportStatus findOf(String findValue) {
		return descriptions.get(findValue);
	}

	public String getCode() {
		return code;
	}
}
