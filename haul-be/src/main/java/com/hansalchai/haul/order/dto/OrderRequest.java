package com.hansalchai.haul.order.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OrderRequest {

	/**
	 * 오더 승인 요청 dto
	 * */
	@Getter
	@NoArgsConstructor
	public static class ApproveRequestDto {

		@NotNull(message = "예약 id는 null일 수 없다.")
		private Long id;

		@Builder
		public ApproveRequestDto(Long id) {
			this.id = id;
		}
	}

	/**
	 * 운송 상태 변경 요청 dto
	 */
	@Getter
	@NoArgsConstructor
	public static class TransportStatusChangeRequestDto {

		@NotNull(message = "오더 id는 null일 수 없다.")
		private Long id; //오더 id
	}

	@Getter
	@NoArgsConstructor
	public static class TransportStatusChangeRequestDtoV2 {

		@NotNull(message = "오더 id는 null일 수 없다.")
		private Long id; //오더 id

		@NotNull(message = "위도는 null이 될 수 없습니다.")
		double latitude;

		@NotNull(message = "경도는 null이 될 수 없습니다.")
		double longitude;

		@Builder
		public TransportStatusChangeRequestDtoV2(Long id, double latitude, double longitude) {
			this.id = id;
			this.latitude = latitude;
			this.longitude = longitude;
		}
	}
}
