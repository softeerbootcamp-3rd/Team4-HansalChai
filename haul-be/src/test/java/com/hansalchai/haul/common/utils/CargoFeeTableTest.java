package com.hansalchai.haul.common.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.utils.CargoFeeTable;
import com.hansalchai.haul.reservation.entity.Cargo;

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
		//given
		Cargo cargo = Cargo.builder()
			.width(10)
			.length(10)
			.width(10)
			.weight(100)
			.build();
		Car car = new Car(CarType.TRUCK500,"포터2", null, 200, 200, 200, 1000, CarCategory.DEFAULT, true);
		int val1 = 6000;
		int val2 = 400;
		//6000kg 400km일때 8T트럭 1대 707000원
		CargoFeeTable.RequestedTruckInfo expected = new CargoFeeTable.RequestedTruckInfo(car, 1, 20000);

		List<Car> cars = new ArrayList<>();
		cars.add(car);
		//when
		CargoFeeTable.RequestedTruckInfo actual = CargoFeeTable.findCost(cars, 1, cargo.getWeight());
		//then

		Assertions.assertEquals(expected.getNumber(), actual.getNumber());
		Assertions.assertEquals(expected.getCost(), actual.getCost());
	}
}