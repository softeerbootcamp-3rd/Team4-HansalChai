package com.hansalchai.haul.reservation.dto;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.cglib.core.Local;

import com.hansalchai.haul.car.entity.Car;
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
		private final double duration;

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
		public ReservationRecommendationDTO(Reservation reservation, double duration) {
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
				.longitude(reservation.getSource().getLongitude())
				.build();
			this.dst = DestinationDTO.builder()
				.name(reservation.getDestination().getName())
				.address(reservation.getDestination().getAddress())
				.latitude(reservation.getDestination().getLatitude())
				.longitude(reservation.getDestination().getLongitude())
				.build();
			this.cost = reservation.getTransport().getFee();
			this.duration = duration;
		}

		private String getSizeToString(Reservation reservation){
			Car car = reservation.getCar();
			return String.format("%d X %d X %d",
				car.getWidth(),
				car.getHeight(),
				car.getLength());
		}
	}

	@Getter
	public static class ReservationDTO{
    	private final String car;
		private final String status;
		private final String datetime;
		private final int cost;
		@Builder
		public ReservationDTO(Reservation reservation) {
			this.car = getCarToString(reservation.getCar());
			this.status = reservation.getTransport().getTransportStatus().getCode();
			this.datetime = getDateTimeString(reservation.getDate(), reservation.getTime());
			this.cost = reservation.getTransport().getFee();
		}

		public String getCarToString(Car car){
			return String.format("%s(%s)",
				car.getType().getCode(),
				car.getModel());
		}

		public String getDateTimeString(LocalDate date, LocalTime time) {
			return date.toString() + " " + time.toString();
		}
	}
}
