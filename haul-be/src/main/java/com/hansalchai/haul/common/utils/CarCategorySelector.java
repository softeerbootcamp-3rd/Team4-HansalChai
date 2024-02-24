package com.hansalchai.haul.common.utils;

import static com.hansalchai.haul.common.utils.ErrorCode.*;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.reservation.entity.CargoOption;

public class CarCategorySelector {
	public static CarCategory selectCarCategory(CargoOption cargoOption){
		if(cargoOption.isFrozen() && cargoOption.isRefrigerated())
			return CarCategory.DEFAULT;

		if(cargoOption.isFrozen())
			return CarCategory.IS_FREEZABLE;
		else if(cargoOption.isRefrigerated())
			return CarCategory.IS_REFRIGERABLE;
		else
			return CarCategory.DEFAULT;
	}
}
