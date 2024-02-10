package com.hansalchai.haul.common.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class KaKaoMapTest {
	@Autowired
	private KakaoMap kakaoMap;
	@Test
	@DisplayName("카카오맵 API가 정상적으로 동작한다.")
	void carPathFindTest() {
		kakaoMap.carPathFind();
	}
}
