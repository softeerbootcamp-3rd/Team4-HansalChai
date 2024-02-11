package com.hansalchai.haul.common.utils;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.reservation.entity.CargoOption;

public class CarCategorySelector {
	public static CarCategory selectCarCategory(CargoOption cargoOption){
		//TODO 예외처리로 변경
		if(cargoOption.isFrozen() && cargoOption.isRefrigerated())
			return CarCategory.IS_BOXTRUCK;

		if(cargoOption.isFrozen())
			return CarCategory.IS_FREEZABLE;
		else if(cargoOption.isRefrigerated())
			return CarCategory.IS_REFRIGERABLE;
		else
			return CarCategory.IS_BOXTRUCK;
	}
}
