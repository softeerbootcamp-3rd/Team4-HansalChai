package com.hansalchai.haul.order.dto;

import com.hansalchai.haul.reservation.entity.Reservation;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
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

		@NotNull(message = "운송 상태는 null일 수 없다.")
		private String transportStatus;
	}

	// 운송 상태 변경 응답 dto
	@Getter
	public static class ResponseDto {

		private Long id; //오더 id

		public ResponseDto(Reservation reservation) {
			this.id = reservation.getReservationId();
		}
	}
}
