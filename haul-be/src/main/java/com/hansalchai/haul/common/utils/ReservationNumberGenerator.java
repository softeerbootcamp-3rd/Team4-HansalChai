package com.hansalchai.haul.common.utils;

import java.util.UUID;

public class ReservationNumberGenerator {
	public static String generateUniqueId() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString().replace("-", "").substring(0, 12);
	}
}
