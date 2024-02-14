package com.hansalchai.haul.common.utils;

import java.math.BigDecimal;

import lombok.Getter;

public class MapUtils{
	@Getter
	public static class Location {
		private final BigDecimal latitude;
		private final BigDecimal longitude;

		public Location(BigDecimal latitude, BigDecimal longitude) {
			this.latitude = latitude;
			this.longitude = longitude;
		}

		@Override
		public String toString() {
			return latitude + "," + longitude;
		}
	}

	@Getter
	public static class DistanceDurationInfo {
		private final double distance;
		private final double duration;

		public DistanceDurationInfo(double distance, double duration) {
			this.distance = distance;
			this.duration = duration;
		}
	}
}

