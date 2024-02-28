package com.hansalchai.haul.car.constants;

public enum CarCategory {
	IS_REFRIGERABLE("냉장 가능 여부"),
	IS_FREEZABLE("냉동 가능 여부"),
	DEFAULT("내장 여부");

	private final String code;

	CarCategory(String code) {
		this.code = code;
	}

}
