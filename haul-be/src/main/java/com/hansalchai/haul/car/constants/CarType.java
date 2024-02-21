package com.hansalchai.haul.car.constants;

public enum CarType {
	TRUCK500(500, "0.5톤트럭"),
	TRUCK1000(1000,"1톤트럭"),
	TRUCK5000(5000, "5톤트럭"),
	TRUCK8000(8000, "8톤트럭"),
	TRUCK15000(15000, "15톤트럭");

	private final int value;
	private final String code;
	CarType(int value,String code) {
		this.value = value;
		this.code = code;
	}

	public static CarType findByValue(int value) {
		for (CarType type : values()) {
			if (type.value == value) {
				return type;
			}
		}
		throw new IllegalArgumentException("Invalid CarType value: " + value);
	}
	public int getValue(){
		return this.value;
	}
	public String getCode() {
		return this.code;
	}
}
