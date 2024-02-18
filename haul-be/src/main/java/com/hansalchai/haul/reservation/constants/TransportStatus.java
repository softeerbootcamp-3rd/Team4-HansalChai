package com.hansalchai.haul.reservation.constants;

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

	// 다음 단계의 운송 상태를 반환
	public static TransportStatus getNextStatus(TransportStatus currentStatus) {

		if (currentStatus == NOT_STARTED) {
			return IN_PROGRESS;
		}

		if (currentStatus == IN_PROGRESS) {
			return DONE;
		}

		return currentStatus;
	}
}
