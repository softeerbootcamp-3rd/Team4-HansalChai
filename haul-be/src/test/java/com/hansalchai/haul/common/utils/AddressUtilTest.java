package com.hansalchai.haul.common.utils;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class AddressUtilTest {

	@ParameterizedTest
	@DisplayName("주소 요약 변환 테스트")
	@CsvSource(
		value = {
			"서울특별시 강남구 강남대로 지하396:서울 강남구",
			"세종특별자치시 국책연구원2로 18:세종",
			"전북특별자치도 임실군 임실읍 임삼로:전북 임실군",
			"경기도 수원시 장안구 영동고속도로:경기도 수원시",
			"제주특별자치도 제주시 관덕로13길:제주도 제주시",
			"강원특별자치도 태백시 태백골3길:강원 태백시"},
		delimiter = ':')
	void toSimpleAddress(String address, String expected) {

		//when
		String result = AddressUtil.toSimpleAddress(address);

		//then
		assertThat(result).isEqualTo(expected);
	}
}