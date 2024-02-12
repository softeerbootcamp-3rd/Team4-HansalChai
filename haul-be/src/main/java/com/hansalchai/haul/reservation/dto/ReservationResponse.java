package com.hansalchai.haul.reservation.dto;

import java.math.BigDecimal;

import com.hansalchai.haul.reservation.entity.Reservation;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

public class ReservationResponse {
	@Getter
	public static class ReservationRecommendationDTO{
		private final CarDTO car;
		private final SourceDTO src;
		private final DestinationDTO dst;
		@NotNull(message = "비용은 Null 일 수 없다.")
		private final int cost;
		@NotNull(message = "걸리는시간은 Null 일 수 없다.")
		private final int duration;

		@Getter
		@Builder
		public static class CarDTO {
			@NotNull(message = "차 대수는 Null 일 수 없다.")
			private int count;
			@NotNull(message = "차 모델은 Null 일 수 없다.")
			private String model;
			@NotNull(message = "차 수용량은 Null 일 수 없다.")
			private String capacity;
			@NotNull(message = "차 스펙은 Null 일 수 없다.")
			private String feature;
			@Nullable
			private String photo;
		}

		@Getter
		@Builder
		public static class SourceDTO{
			@NotNull(message = "출발지 이름은 Null 일 수 없다.")
			private String name;
			@NotNull(message = "출발지 주소는 Null 일 수 없다.")
			private String address;
			@NotNull(message = "출발지 위도는 Null 일 수 없다.")
			private BigDecimal latitude;
			@NotNull(message = "출발지 경도는 Null 일 수 없다.")
			private BigDecimal longitude;
		}

		@Getter
		@Builder
		public static class DestinationDTO{
			@NotNull(message = "출발지 이름은 Null 일 수 없다.")
			private String name;
			@NotNull(message = "출발지 주소는 Null 일 수 없다.")
			private String address;
			@NotNull(message = "출발지 위도는 Null 일 수 없다.")
			private BigDecimal latitude;
			@NotNull(message = "출발지 경도는 Null 일 수 없다.")
			private BigDecimal longitude;
		}

		@Builder
		public ReservationRecommendationDTO(Reservation reservation, int duration) {
			this.car = CarDTO.builder()
				.count(reservation.getCount())
				.model(reservation.getCar().getModel())
				.capacity(reservation.getCar().getType().name())
				.feature(getSizeToString(reservation))
				.photo(reservation.getCar().getPhoto())
				.build();
			this.src = SourceDTO.builder()
				.name(reservation.getSource().getName())
				.address(reservation.getSource().getAddress())
				.latitude(reservation.getSource().getLatitude())
				.latitude(reservation.getSource().getLongitude())
				.build();
			this.dst = DestinationDTO.builder()
				.name(reservation.getDestination().getName())
				.address(reservation.getDestination().getAddress())
				.latitude(reservation.getDestination().getLatitude())
				.latitude(reservation.getDestination().getLongitude())
				.build();
			this.cost = reservation.getTransport().getFee();
			this.duration = duration;
		}

		private String getSizeToString(Reservation reservation){
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(reservation.getCar().getWidth())
				.append(" X ")
				.append(reservation.getCar().getHeight())
				.append(" X ")
				.append(reservation.getCar().getLength());
			return stringBuilder.toString();
		}

	}
}
