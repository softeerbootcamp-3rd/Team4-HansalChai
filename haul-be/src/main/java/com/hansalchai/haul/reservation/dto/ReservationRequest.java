package com.hansalchai.haul.reservation.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class ReservationRequest {
	@Getter
	@Setter
	public static class CreateReservationDTO {
		private String type;
		private LocalDate date;
		private LocalTime time;
		private SourceDTO src;
		private DestinationDTO dst;
		private CargoDTO cargo;
		private CargoOptionDTO cargoOption;

		@Getter
		@Setter
		public static class SourceDTO {
			@NotNull(message = "출발지 이름은 Null 일 수 없다.")
			private String name;

			@NotNull(message = "출발지 주소는 Null 일 수 없다.")
			private String address;

			@NotNull(message = "출발지 세부주소는 Null 일 수 없다.")
			private String detailAddress;

			@NotNull(message = "출발지 위도는 Null 일 수 없다.")
			private BigDecimal latitude;

			@NotNull(message = "출발지 경도는 Null 일 수 없다.")
			private BigDecimal longitude;

			@NotNull(message = "출발지 전화번호는 Null 일 수 없다.")
			private String tel;
		}

		@Getter
		@Setter
		public static class DestinationDTO {
			@NotNull(message = "도착지 이름은 Null 일 수 없다.")
			private String name;

			@NotNull(message = "도착지 주소는 Null 일 수 없다.")
			private String address;

			@NotNull(message = "도착지 세부주소는 Null 일 수 없다.")
			private String detailAddress;

			@NotNull(message = "도착지 위도는 Null 일 수 없다.")
			private BigDecimal latitude;

			@NotNull(message = "도착지 경도는 Null 일 수 없다.")
			private BigDecimal longitude;

			@NotNull(message = "도착지 전화번호는 Null 일 수 없다.")
			private String tel;
		}

		@Getter
		@Setter
		public static class CargoDTO {
			@NotNull(message = "화물 가로는 Null 일 수 없다.")
			@Max(value = 1000, message = "화물 가로는 10m를 넘을 수 없다.")
			private int width;

			@NotNull(message = "화물 세로는 Null 일 수 없다.")
			@Max(value = 1000, message = "화물 세로는 10m를 넘을 수 없다.")
			private int length;

			@NotNull(message = "화물 높이는 Null 일 수 없다.")
			@Max(value = 1000, message = "화물 높이는 10m를 넘을 수 없다.")
			private int height;

			@NotNull(message = "화물 무게는 Null 일 수 없다.")
			private int weight;
		}

		@Getter
		@Setter
		public static class CargoOptionDTO {
			@NotNull(message = "냉장여부는 Null 일 수 없다.")
			private boolean isRefrigerated;

			@NotNull(message = "냉동여부는 Null 일 수 없다.")
			private boolean isFrozen;

			@NotNull(message = "가구여부는 Null 일 수 없다.")
			private boolean	isFurniture;

			@NotNull(message = "리프트필요여부는 Null 일 수 없다.")
			private boolean isLiftRequired;
		}
	}

}
