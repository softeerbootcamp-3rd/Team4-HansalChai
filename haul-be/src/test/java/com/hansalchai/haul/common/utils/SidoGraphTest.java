package com.hansalchai.haul.common.utils;

import static com.hansalchai.haul.common.utils.SidoGraph.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class SidoGraphTest {

	@Test
	@DisplayName("시도 소트 정상적 동작확인")
	void SidoSortTest() {
		for(int i = 0;i < sidoNames.size();i++){
			for(int j = 1; j <= sidoSortedMap.get(sidoNames.get(i)).size();j++){
				ArrayList<String> sido = getSidoByDepth(sidoNames.get(i), j);
				if(j == 1)
					Assertions.assertEquals(1, sido.size());
				Assertions.assertNotNull(sido);
			}
		}

	}
}
