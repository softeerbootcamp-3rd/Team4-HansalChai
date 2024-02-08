package com.hansalchai.haul.common.utils;

import java.util.Arrays;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.hansalchai.haul.common.utils.CargoFeeTable;

@SpringBootTest
class CargoFeeTableTest {
	@Test
	@DisplayName("가격표가 정상적으로 만들어졌다.")
	void TableInitializeTest() {
		for (int i = 0; i <
			// given
			CargoFeeTable.test.size(); i++) {
			System.out.println("List " + i + ":");
			for (int[] arr :
				// given
				CargoFeeTable.test.get(i)) {
				System.out.println(Arrays.toString(arr));
			}
		}
	}

	@Test
	@DisplayName("사용자가 무게와 거리를 입력하면 정상적으로 요금을 불러온다.")
	void FindCostTest(){
		System.out.println(Arrays.toString(CargoFeeTable.findCost(6000, 400)));
	}
}