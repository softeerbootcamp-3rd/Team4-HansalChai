package com.hansalchai.haul.reservation.constants;

public enum TransportType {
	GENERAL("일반 용달"),
	MOVE("용달 이사"),
	MINI("미니 용달"),
	BUSINESS("비즈니스 운송");

	private final String code;
	TransportType(String code) {
		this.code = code;
	}



	public static TransportType stringToEnum(String text) {
		for (TransportType status : TransportType.values()) {
			if (status.code.equalsIgnoreCase(text)) {
				return status;
			}
		}
		throw new IllegalArgumentException("No constant with code " + text + " found");
	}

}
