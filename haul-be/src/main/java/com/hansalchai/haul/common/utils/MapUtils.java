package com.hansalchai.haul.common.utils;

import lombok.Getter;

public class MapUtils {
	@Getter
	public static class Location {
		private final double latitude;
		private final double longitude;

		public Location(double latitude, double longitude) {
			this.latitude = latitude;
			this.longitude = longitude;
		}

		@Override
		public String toString() {
			return longitude + "," + latitude;
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

