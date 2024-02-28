package com.hansalchai.haul.common.utils;

import java.time.LocalDate;
import java.time.LocalTime;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ReservationUtilTest {

	@Test
	@DisplayName("예약 날짜 문자열 형식 변환 테스트")
	void dateTimeToString() {

		//given
		LocalDate date = LocalDate.parse("2024-02-12");
		LocalTime time = LocalTime.parse("11:30");

		//when
		String result = ReservationUtil.dateTimeToString(date, time);

		//then
		Assertions.assertThat(result).isEqualTo("2024.02.12 11:30");
	}

}
