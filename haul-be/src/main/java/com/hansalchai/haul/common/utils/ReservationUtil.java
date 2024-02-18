package com.hansalchai.haul.common.utils;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ReservationUtil {

	private static final DateTimeFormatter dateOutputFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

	public static String dateTimeToString(LocalDate date, LocalTime time) {
		return convertDateFormat(date) + " " + time.toString();
	}

	// 문자열 형식 변환 : 2024-02-12 -> 2024.02.12
	private static String convertDateFormat(LocalDate date) {
		return date.format(dateOutputFormatter);
	}

	public static int cutCost(int fee) {
		return fee / 10000;
	}
}
