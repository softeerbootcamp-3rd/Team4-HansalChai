package com.hansalchai.haul.reservation.constants;

import java.util.Arrays;

public enum TransportStatus {
	NOT_RESERVATED("예약 전"),
	PENDING("매칭 중"),
	NOT_STARTED("운송 전"),
	IN_PROGRESS("운송 중"),
	DONE("운송 완료");

	private final String code;

	TransportStatus(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public static String getCode(TransportStatus status) {
		return status.getCode();
	}

	public static TransportStatus getNextStatus(String currentStatus) {

		// 문자열 형태의 운송 상태를 enum 상수로 변환
		TransportStatus transportStatus = getTransportStatus(currentStatus);

		// 다음 운송 상태를 반환
		if (transportStatus == NOT_STARTED) {
			return IN_PROGRESS;
		}
		return DONE;
	}

	private static TransportStatus getTransportStatus(String input) {
		return Arrays.stream(TransportStatus.values())
			.filter(transportStatus -> transportStatus.code.equals(input))
			.findAny()
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 운송 상태입니다."));
	}
}
