package com.hansalchai.haul.common.utils;

import java.util.UUID;
import java.util.stream.Collectors;

public class ReservationNumberGenerator {
	public static final int LENGTH = 12;

	public static String generateUniqueId() {
		UUID uuid = UUID.randomUUID();
		String pressured = uuid.toString().replace("-", "").substring(0, LENGTH);
		return pressured.chars()
			.map(c -> Character.isDigit(c) ? Character.getNumericValue(c) % 10 : (int)c % 10)
			.mapToObj(Integer::toString)
			.collect(Collectors.joining());
	}
}
