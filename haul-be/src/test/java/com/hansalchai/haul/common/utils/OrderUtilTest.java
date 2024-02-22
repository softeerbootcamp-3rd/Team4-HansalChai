package com.hansalchai.haul.common.utils;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class OrderUtilTest {

	@Test
	@DisplayName("경도, 위도 값으로 두 지점의 거리를 계산한다. (거리의 단위는 m)")
	void calculateDistance() {

		//given : 학동 에티버스 - 학동역
		double lat1 = 37.5138649;
		double lon1 = 127.0295296;
		double lat2 = 37.51410107;
		double lon2 = 127.03123824;

		//when
		double distance = OrderUtil.calculateDistance(lat1, lon1, lat2, lon2);

		//then
		Assertions.assertThat(distance).isLessThanOrEqualTo(300);
	}
}
