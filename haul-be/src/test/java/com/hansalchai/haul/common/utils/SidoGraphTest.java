package com.hansalchai.haul.common.utils;

import static com.hansalchai.haul.common.utils.SidoGraph.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class SidoGraphTest {

	@Test
	@DisplayName("시도 소트")
	void SidoSortTest() {
		System.out.println(sidoSortedMap.get("광주광역시").size());
		ArrayList<String> sido = getSidoByDepth("광주광역시", 1);
		System.out.println(sido);
	}
}
