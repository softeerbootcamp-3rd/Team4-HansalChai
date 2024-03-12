package com.hansalchai.haul.reservation.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hansalchai.haul.reservation.entity.Cargo;
import com.hansalchai.haul.reservation.entity.CargoOption;
import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Source;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class ReservationRequest {
	@Getter
	@Setter
	@ToString
	@NoArgsConstructor
	@AllArgsConstructor
	public static class CreateReservationDTO {
		@NotNull(message = "운송수단은 Null 일 수 없다.")
		private String transportType;
		@NotNull(message = "예약 날짜는 Null 일 수 없다.")
		private LocalDate date;
		@NotNull(message = "예약 시간은 Null 일 수 없다.")
		private LocalTime time;
		private SourceDTO src;
		private DestinationDTO dst;
		private CargoDTO cargo;
		private CargoOptionDTO cargoOption;

		@Getter
		@ToString
		@NoArgsConstructor
		public static class SourceDTO {
			@NotNull(message = "출발지 이름은 Null 일 수 없다.")
			private String name;

			@NotNull(message = "출발지 주소는 Null 일 수 없다.")
			private String address;

			@NotNull(message = "출발지 세부주소는 Null 일 수 없다.")
			private String detailAddress;

			@NotNull(message = "출발지 위도는 Null 일 수 없다.")
			private double latitude;

			@NotNull(message = "출발지 경도는 Null 일 수 없다.")
			private double longitude;

			@NotNull(message = "출발지 전화번호는 Null 일 수 없다.")
			private String tel;

			@Builder
			public SourceDTO(String name, String address, String detailAddress, double latitude, double longitude,
				String tel) {
				this.name = name;
				this.address = address;
				this.detailAddress = detailAddress;
				this.latitude = latitude;
				this.longitude = longitude;
				this.tel = tel;
			}

			public Source build() {
				return Source.builder()
					.name(name)
					.address(address)
					.detailAddress(detailAddress)
					.latitude(latitude)
					.longitude(longitude)
					.tel(tel)
					.build();
			}
		}

		@Getter
		@ToString
		@NoArgsConstructor
		public static class DestinationDTO {
			@NotNull(message = "도착지 이름은 Null 일 수 없다.")
			private String name;

			@NotNull(message = "도착지 주소는 Null 일 수 없다.")
			private String address;

			@NotNull(message = "도착지 세부주소는 Null 일 수 없다.")
			private String detailAddress;

			@NotNull(message = "도착지 위도는 Null 일 수 없다.")
			private double latitude;

			@NotNull(message = "도착지 경도는 Null 일 수 없다.")
			private double longitude;

			@NotNull(message = "도착지 전화번호는 Null 일 수 없다.")
			private String tel;

			@Builder
			public DestinationDTO(String name, String address, String detailAddress, double latitude, double longitude,
				String tel) {
				this.name = name;
				this.address = address;
				this.detailAddress = detailAddress;
				this.latitude = latitude;
				this.longitude = longitude;
				this.tel = tel;
			}

			public Destination build() {
				return Destination.builder()
					.name(name)
					.address(address)
					.detailAddress(detailAddress)
					.latitude(latitude)
					.longitude(longitude)
					.tel(tel)
					.build();
			}
		}

		@Getter
		@ToString
		@NoArgsConstructor
		public static class CargoDTO {
			@NotNull(message = "화물 가로는 Null 일 수 없다.")
			@Range(min = 0, max = 1000, message = "화물 가로는 10m를 넘을 수 없다.")
			private int width;

			@NotNull(message = "화물 세로는 Null 일 수 없다.")
			@Range(min = 0, max = 1000, message = "화물 세로는 10m를 넘을 수 없다.")
			private int length;

			@NotNull(message = "화물 높이는 Null 일 수 없다.")
			@Range(min = 0, max = 1000, message = "화물 높이는 10m를 넘을 수 없다.")
			private int height;

			@NotNull(message = "화물 무게는 Null 일 수 없다.")
			@Range(min = 0, max = 1000000, message = "화물 무게는 1000T를 넘을 수 없다.")
			private int weight;

			@Builder
			public CargoDTO(int width, int length, int height, int weight) {
				this.width = width;
				this.length = length;
				this.height = height;
				this.weight = weight;
			}

			public Cargo build() {
				return Cargo.builder()
					.width(width)
					.length(length)
					.height(height)
					.weight(weight)
					.build();
			}
		}

		@Getter
		@ToString
		@NoArgsConstructor
		public static class CargoOptionDTO {
			@JsonProperty("refrigerated")
			@NotNull(message = "냉장여부는 Null 일 수 없다.")
			private boolean isRefrigerated;

			@JsonProperty("frozen")
			@NotNull(message = "냉동여부는 Null 일 수 없다.")
			private boolean isFrozen;

			@JsonProperty("furniture")
			@NotNull(message = "가구여부는 Null 일 수 없다.")
			private boolean isFurniture;

			@JsonProperty("liftRequired")
			@NotNull(message = "리프트필요여부는 Null 일 수 없다.")
			private boolean isLiftRequired;

			@Builder
			public CargoOptionDTO(boolean isRefrigerated, boolean isFrozen, boolean isFurniture,
				boolean isLiftRequired) {
				this.isRefrigerated = isRefrigerated;
				this.isFrozen = isFrozen;
				this.isFurniture = isFurniture;
				this.isLiftRequired = isLiftRequired;
			}

			public CargoOption build() {
				return CargoOption.builder()
					.isRefrigerated(isRefrigerated)
					.isFrozen(isFrozen)
					.isFurniture(isFurniture)
					.isLiftRequired(isLiftRequired)
					.build();
			}
		}
	}

	@Getter
	@Setter
	@ToString
	@NoArgsConstructor
	@AllArgsConstructor
	public static class CreateReservationGuestDTO {
		@NotNull(message = "운송수단은 Null 일 수 없다.")
		private String transportType;
		@NotNull(message = "예약 날짜는 Null 일 수 없다.")
		private LocalDate date;
		@NotNull(message = "예약 시간은 Null 일 수 없다.")
		private LocalTime time;
		private SourceDTO src;
		private DestinationDTO dst;
		private CargoDTO cargo;
		private CargoOptionDTO cargoOption;
		private UserInfoDTO userInfo;

		@Getter
		@Setter
		@ToString
		@NoArgsConstructor
		public static class SourceDTO {
			@NotNull(message = "출발지 이름은 Null 일 수 없다.")
			private String name;

			@NotNull(message = "출발지 주소는 Null 일 수 없다.")
			private String address;

			@NotNull(message = "출발지 세부주소는 Null 일 수 없다.")
			private String detailAddress;

			@NotNull(message = "출발지 위도는 Null 일 수 없다.")
			private double latitude;

			@NotNull(message = "출발지 경도는 Null 일 수 없다.")
			private double longitude;

			@NotNull(message = "출발지 전화번호는 Null 일 수 없다.")
			private String tel;

			@Builder
			public SourceDTO(String name, String address, String detailAddress, double latitude, double longitude,
				String tel) {
				this.name = name;
				this.address = address;
				this.detailAddress = detailAddress;
				this.latitude = latitude;
				this.longitude = longitude;
				this.tel = tel;
			}

			public Source build() {
				return Source.builder()
					.name(name)
					.address(address)
					.detailAddress(detailAddress)
					.latitude(latitude)
					.longitude(longitude)
					.tel(tel)
					.build();
			}
		}

		@Getter
		@Setter
		@ToString
		@NoArgsConstructor
		public static class DestinationDTO {
			@NotNull(message = "도착지 이름은 Null 일 수 없다.")
			private String name;

			@NotNull(message = "도착지 주소는 Null 일 수 없다.")
			private String address;

			@NotNull(message = "도착지 세부주소는 Null 일 수 없다.")
			private String detailAddress;

			@NotNull(message = "도착지 위도는 Null 일 수 없다.")
			private double latitude;

			@NotNull(message = "도착지 경도는 Null 일 수 없다.")
			private double longitude;

			@NotNull(message = "도착지 전화번호는 Null 일 수 없다.")
			private String tel;

			@Builder
			public DestinationDTO(String name, String address, String detailAddress, double latitude, double longitude,
				String tel) {
				this.name = name;
				this.address = address;
				this.detailAddress = detailAddress;
				this.latitude = latitude;
				this.longitude = longitude;
				this.tel = tel;
			}

			public Destination build() {
				return Destination.builder()
					.name(name)
					.address(address)
					.detailAddress(detailAddress)
					.latitude(latitude)
					.longitude(longitude)
					.tel(tel)
					.build();
			}
		}

		@Getter
		@Setter
		@ToString
		@NoArgsConstructor
		public static class CargoDTO {
			@NotNull(message = "화물 가로는 Null 일 수 없다.")
			@Range(min = 0, max = 1000, message = "화물 가로는 10m를 넘을 수 없다.")
			private int width;

			@NotNull(message = "화물 세로는 Null 일 수 없다.")
			@Range(min = 0, max = 1000, message = "화물 세로는 10m를 넘을 수 없다.")
			private int length;

			@NotNull(message = "화물 높이는 Null 일 수 없다.")
			@Range(min = 0, max = 1000, message = "화물 높이는 10m를 넘을 수 없다.")
			private int height;

			@NotNull(message = "화물 무게는 Null 일 수 없다.")
			@Range(min = 0, max = 1000000, message = "화물 무게는 1000T를 넘을 수 없다.")
			private int weight;

			@Builder
			public CargoDTO(int width, int length, int height, int weight) {
				this.width = width;
				this.length = length;
				this.height = height;
				this.weight = weight;
			}

			public Cargo build() {
				return Cargo.builder()
					.width(width)
					.length(length)
					.height(height)
					.weight(weight)
					.build();
			}
		}

		@Getter
		@Setter
		@ToString
		@NoArgsConstructor
		public static class CargoOptionDTO {
			@JsonProperty("refrigerated")
			@NotNull(message = "냉장여부는 Null 일 수 없다.")
			private boolean isRefrigerated;

			@JsonProperty("frozen")
			@NotNull(message = "냉동여부는 Null 일 수 없다.")
			private boolean isFrozen;

			@JsonProperty("furniture")
			@NotNull(message = "가구여부는 Null 일 수 없다.")
			private boolean isFurniture;

			@JsonProperty("liftRequired")
			@NotNull(message = "리프트필요여부는 Null 일 수 없다.")
			private boolean isLiftRequired;

			@Builder
			public CargoOptionDTO(boolean isRefrigerated, boolean isFrozen, boolean isFurniture,
				boolean isLiftRequired) {
				this.isRefrigerated = isRefrigerated;
				this.isFrozen = isFrozen;
				this.isFurniture = isFurniture;
				this.isLiftRequired = isLiftRequired;
			}

			public CargoOption build() {
				return CargoOption.builder()
					.isRefrigerated(isRefrigerated)
					.isFrozen(isFrozen)
					.isFurniture(isFurniture)
					.isLiftRequired(isLiftRequired)
					.build();
			}
		}

		@Getter
		@Setter
		@ToString
		@NoArgsConstructor
		public static class UserInfoDTO {
			@NotNull(message = "비회원 유저 이름은 Null일 수 없다.")
			private String name;

			@NotNull(message = "비회원 유저 번호는 Null일 수 없다.")
			private String tel;

			@Builder
			public UserInfoDTO(String name, String tel) {
				this.name = name;
				this.tel = tel;
			}
		}
	}
}
