package com.hansalchai.haul.common.utils;

import java.math.BigDecimal;

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
	@DisplayName("카카오맵 API가 정상적으로 동작한다.")
	void carPathFindTest() {
		Location src = new Location(BigDecimal.valueOf(127.11015314141542),BigDecimal.valueOf(37.39472714688412));
		Location dst = new Location(BigDecimal.valueOf(127.10824367964793),BigDecimal.valueOf(37.401937080111644));
		kakaoMap.carPathFind(src, dst);
	}
}
