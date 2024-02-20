package com.hansalchai.haul.common.utils;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.reservation.entity.Reservation;

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
		if(fee < 10000)
			return 1;
		return fee / 10000;
	}

	public static String makeUserUrl(String photo){
		return "driver-profile/" + photo;
	}

	public static String makeCarUrl(String photo){
		return "car/" + photo;
	}

	public static String getSizeToString(Reservation reservation){
		Car car = reservation.getCar();
		return String.format("%.1f X %.1f X %.1f",
			car.getWidth() / 100.0,
			car.getHeight() / 100.0,
			car.getLength()/ 100.0);
	}

	public static String getCarToString(Car car){
		return String.format("%s(%s)",
			car.getType().getCode(),
			car.getModel());
	}

	public static String getDateTimeString(LocalDate date, LocalTime time) {
		return date.toString() + " " + time.toString();
	}

	public static String getCarEnumTypeToWeight(int type){
		return (double)type / 1000 + "톤";
	}
}
