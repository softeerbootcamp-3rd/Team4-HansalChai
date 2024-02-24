package com.hansalchai.haul.common.utils;

import java.math.BigDecimal;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hansalchai.haul.common.utils.KaKaoMap.KakaoMap;

@SpringBootTest
public class KaKaoMapTest {
	@Autowired
	private KakaoMap kakaoMap;
	@Test
	@DisplayName("unittest : 카카오맵 API가 정상적으로 동작한다.")
	void carPathFindTest() {
		//given
		MapUtils.Location src = new MapUtils.Location(127.11015314141542,37.39472714688412);
		MapUtils.Location dst = new MapUtils.Location(127.10824367964793,37.401937080111644);
		double val1 = 1.033;//km
		int val2 = 254;
		MapUtils.DistanceDurationInfo expected = new MapUtils.DistanceDurationInfo(val1, val2);
		//when
		MapUtils.DistanceDurationInfo actual = kakaoMap.carPathFind(src, dst);

		//Then
		Assertions.assertEquals(expected.getDistance(), actual.getDistance());
		//duration은 계속 바뀜.
	}

	@Test
	@DisplayName("unittest : 카카오맵 API가 정상적으로 동작한다.")
	void roadAddress() {
		//given
		MapUtils.Location src = new MapUtils.Location(37.39472714688412,127.11015314141542);
		//when
		String expected = kakaoMap.searchRoadAddress(src.getLatitude(), src.getLongitude());
		String actual = "경기도";
		//Then
		Assertions.assertEquals(actual, expected);
	}
}
