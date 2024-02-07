package com.hansalchai.haul.common.utils;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.hansalchai.haul.common.utils.CargoFeeTable;

@SpringBootTest
class CargoFeeTableTest {
	@Test
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
	void FindCostTest(){
		System.out.println(CargoFeeTable.findCost(1200, 25));
	}
}