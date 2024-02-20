package com.hansalchai.haul.common.utils;

import static com.hansalchai.haul.common.utils.SidoGraph.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class SidoGraphTest {

	@Test
	@DisplayName("시도 소트")
	void SidoSortTest() {
		List<String> sido = sidoSort("광주광역시");
	}
}
