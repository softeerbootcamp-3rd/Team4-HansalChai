package com.hansalchai.haul.order.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TransportStatusChange {

	// 운송 상태 변경 요청 dto
	@Getter
	@NoArgsConstructor
	public static class RequestDto {

		@NotNull(message = "오더 id는 null일 수 없다.")
		private Long id; //오더 id

		@NotNull(message = "위도는 null이 될 수 없습니다.")
		double latitude;

		@NotNull(message = "경도는 null이 될 수 없습니다.")
		double longitude;
	}

	// 운송 상태 변경 응답 dto
	@Getter
	public static class ResponseDto {

		private boolean hasInProgressOrder;
		private boolean isDriverNearBy;

		@Builder
		public ResponseDto(boolean hasInProgressOrder, boolean isDriverNearBy) {
			this.hasInProgressOrder = hasInProgressOrder;
			this.isDriverNearBy = isDriverNearBy;
		}
	}
}
