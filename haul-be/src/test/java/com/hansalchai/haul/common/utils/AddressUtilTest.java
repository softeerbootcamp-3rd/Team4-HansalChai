package com.hansalchai.haul.common.utils;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AddressUtilTest {

	@Test
	@DisplayName("주소 요약 변환 테스트")
	void toSimpleAddress() {

		//given
		String address = "서울특별시 강남구 강남대로 지하396";

		//when
		String result = AddressUtil.toSimpleAddress(address);

		//then
		assertThat(result).isEqualTo("서울특별시 강남구");
	}
}