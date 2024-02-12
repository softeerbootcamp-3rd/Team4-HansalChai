package com.hansalchai.haul.reservation.dto;

import java.math.BigDecimal;

import com.hansalchai.haul.reservation.entity.Reservation;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ReservationResponse {
	@Getter
	public static class ReservationRecommendationDTO{
		private CarDTO car;
		private SourceDTO src;
		private DestinationDTO dst;
		private int cost;
		private int duration;

		@Getter
		@Builder
		public static class CarDTO {
			private int count;
			private String model;
			private String capacity;
			private String feature;
		}

		@Getter
		@Builder
		public static class SourceDTO{
			private String name;
			private String address;
			private BigDecimal latitude;
			private BigDecimal longitude;
		}

		@Getter
		@Builder
		public static class DestinationDTO{
			private String name;
			private String address;
			private BigDecimal latitude;
			private BigDecimal longitude;
		}

		@Builder
		public ReservationRecommendationDTO(Reservation reservation, int duration) {
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(reservation.getCar().getWidth())
				.append(" X ")
				.append(reservation.getCar().getHeight())
				.append(" X ")
				.append(reservation.getCar().getLength());

			this.car = CarDTO.builder()
				.count(reservation.getCount())
				.model(reservation.getCar().getModel())
				.capacity(reservation.getCar().getType().name())
				.feature(stringBuilder.toString())
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
	}
}
