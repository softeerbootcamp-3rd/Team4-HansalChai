package com.hansalchai.haul.reservation.constants;

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

}
