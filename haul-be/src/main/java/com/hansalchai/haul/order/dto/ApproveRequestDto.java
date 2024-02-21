package com.hansalchai.haul.order.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ApproveRequestDto {

	@NotNull(message = "예약 id는 null일 수 없다.")
	private Long id;

	@Builder
	public ApproveRequestDto(Long id) {
		this.id = id;
	}
}
