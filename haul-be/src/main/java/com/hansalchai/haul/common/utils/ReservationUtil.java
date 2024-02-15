package com.hansalchai.haul.common.utils;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ReservationUtil {

	public static String dateTimeToString(LocalDate date, LocalTime time) {
		return date.toString() + " " + time.toString();
	}

	public static int cutCost(int fee) {
		return fee / 10000;
	}
}
