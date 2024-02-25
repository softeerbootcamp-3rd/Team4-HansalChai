package com.hansalchai.haul.common.utils;

import java.util.Objects;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AddressUtil {

	// 주소 요약 메서드
	public static String toSimpleAddress(String address) {
		String[] tokens = address.split(" ");

		StringBuilder simpleAddress = new StringBuilder();

		// 제주특별자치도 -> 제주도
		if (tokens[0].equals("제주특별자치도")) {
			simpleAddress.append("제주도");
		}
		//서울특별시 -> 서울, 세종특별자치시 -> 세종, 전북특별자치도 -> 전북
		else {
			simpleAddress.append(
				tokens[0]
					.replace("특별시", "")
					.replace("광역시", "")
					.replace("특별자치시", "")
					.replace("특별자치도", ""));
		}

		//세종특별자치시 국책연구원2로 18 -> 세종
		if (!tokens[1].contains("로")) {
			simpleAddress.append(" " + tokens[1]);
		}

		return simpleAddress.toString();
	}

	public static String kakaoAdressToSrcAddress(String address) {
		if (Objects.equals(address, "경기도"))
			return "경기";

		if (address.length() >= 7)
			return address;

		if (address.contains("특별시") || address.contains("광역시")) {
			address = address.replace("특별시", "");
			address = address.replace("광역시", "");
			return address;
		}

		return String.valueOf(address.charAt(0)) + String.valueOf(address.charAt(2));
	}
}
