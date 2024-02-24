package com.hansalchai.haul.common.utils;

import java.time.LocalDateTime;
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
	@DisplayName("사용자가 무게와 거리를 입력하면 정상적으로 요금을 불러온다.")
	void FindCostTest(){
		//distance
		for(int i = 1;i <= 500;i++){
			// cargo Weight
			for(int j = 1;j <= 50000;j++){
				Cargo cargo = Cargo.builder()
					.width(10)
					.length(10)
					.width(10)
					.weight(j)
					.build();

				List<Car> cars = carMaker();
				//when

				CargoFeeTable.RequestedTruckInfo result = CargoFeeTable.findCost(cars, i, cargo.getWeight());
				Assertions.assertNotNull(result);
			}
		}
	}

	public List<Car> carMaker() {
		List<Car> cars = new ArrayList<>();

		cars.add(new Car(CarType.TRUCK500, "뉴다마스", null, 175, 126, 126, 500, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 280, 160, 30, 1000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 300, 160, 140, 1000, CarCategory.DEFAULT, true));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 270, 160, 150, 1000, CarCategory.IS_REFRIGERABLE, true));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 280, 160, 150, 1000, CarCategory.IS_FREEZABLE, true));
		cars.add(new Car(CarType.TRUCK5000, "메가트럭", null, 460, 230, 40, 5000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 180, 40, 8000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 190, 190, 8000, CarCategory.DEFAULT, true));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 180, 180, 8000, CarCategory.IS_REFRIGERABLE, true));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 190, 190, 8000, CarCategory.IS_FREEZABLE, true));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.DEFAULT, true));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.IS_REFRIGERABLE, true));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.IS_FREEZABLE, true));

		return cars;
	}
}