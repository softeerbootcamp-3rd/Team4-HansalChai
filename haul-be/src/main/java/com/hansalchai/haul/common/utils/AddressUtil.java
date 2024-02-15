package com.hansalchai.haul.common.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AddressUtil {

	// '서울특별시 강남구 강남대로 지하396' -> '서울시 강남구'로 변환
	public static String toSimpleAddress(String address) {
		String[] tokens = address.split(" ");
		return tokens[0] + " " + tokens[1];
	}
}
