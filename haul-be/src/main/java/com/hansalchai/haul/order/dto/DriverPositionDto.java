package com.hansalchai.haul.order.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class DriverPositionDto {
	@NotNull(message = "위도는 null이 될 수 없습니다.")
	double latitude;
	@NotNull(message = "경도는 null이 될 수 없습니다.")
	double longitude;
}
