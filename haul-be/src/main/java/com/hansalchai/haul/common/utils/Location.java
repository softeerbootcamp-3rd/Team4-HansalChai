package com.hansalchai.haul.common.utils;

import java.math.BigDecimal;

import lombok.Getter;

@Getter
public class Location {
	private BigDecimal latitude;
	private BigDecimal longitude;

	public Location(BigDecimal latitude, BigDecimal longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}

	@Override
	public String toString() {
		return latitude + "," + longitude;
	}
}
