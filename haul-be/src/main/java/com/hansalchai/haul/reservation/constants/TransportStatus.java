package com.hansalchai.haul.reservation.constants;

import lombok.Getter;

@Getter
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

}
