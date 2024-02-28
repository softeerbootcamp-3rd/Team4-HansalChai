package com.hansalchai.haul.reservation.dto;

import static com.hansalchai.haul.common.utils.ReservationUtil.*;

import java.util.List;
import java.util.Optional;

import com.hansalchai.haul.common.utils.S3Util;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.entity.Reservation;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

public class ReservationResponse {
	@Getter
	public static class ReservationRecommendationDTO {
		private final Long reservationId;
		private final CarDTO car;
		@NotNull(message = "비용은 Null 일 수 없다.")
		private final int cost;
		@NotNull(message = "걸리는시간은 Null 일 수 없다.")
		private final double requiredTime;
		private final String number;

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

		@Builder
		public ReservationRecommendationDTO(Reservation reservation, S3Util s3Util) {
			this.reservationId = reservation.getReservationId();
			this.car = CarDTO.builder()
				.count(reservation.getCount())
				.model(reservation.getCar().getModel())
				.capacity(getCarEnumTypeToWeight(reservation.getCar().getType().getValue()))
				.feature(getSizeToString(reservation))
				.photo(s3Util.getImage(makeCarUrl(reservation.getCar().getPhoto())))
				.build();
			this.cost = cutCost(reservation.getTransport().getFee());
			this.requiredTime = reservation.getTransport().getRequiredTime();
			this.number = reservation.getNumber();
		}
	}

	@Getter
	public static class ReservationDTO {
		List<ReservationInfoDTO> reservationInfoDTOS;
		boolean isLastPage;

		public ReservationDTO(List<ReservationInfoDTO> reservationInfoDTOS, boolean isLastPage) {
			this.reservationInfoDTOS = reservationInfoDTOS;
			this.isLastPage = isLastPage;
		}

		@Getter
		public static class ReservationInfoDTO {
			private final Long id;
			private final String car;
			private final String status;
			private final String datetime;
			private final int cost;

			@Builder
			public ReservationInfoDTO(Reservation reservation) {
				this.id = reservation.getReservationId();
				this.car = getCarToString(reservation.getCar());
				this.status = TransportStatus.getCode(reservation.getTransport().getTransportStatus());
				this.datetime = getDateTimeString(reservation.getDate(), reservation.getTime());
				this.cost = cutCost(reservation.getTransport().getFee());
			}
		}
	}

	@Getter
	public static class ReservationDetailDTO {
		private DriverDTO driver;
		private final CarDTO car;
		private final SourceDTO src;
		private final DestinationDTO dst;
		@NotNull(message = "비용은 Null 일 수 없다.")
		private final int cost;
		@NotNull(message = "걸리는시간은 Null 일 수 없다.")
		private final double requiredTime;
		@NotNull(message = "현 상태는 Null 일 수 없다.")
		private final String status;

		@Getter
		@Builder
		public static class DriverDTO {
			private String name;
			private String tel;
			private String photo;
		}

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
		public static class SourceDTO {
			@NotNull(message = "출발지 이름은 Null 일 수 없다.")
			private String name;
			@NotNull(message = "출발지 주소는 Null 일 수 없다.")
			private String address;
			@NotNull(message = "출발지 위도는 Null 일 수 없다.")
			private double latitude;
			@NotNull(message = "출발지 경도는 Null 일 수 없다.")
			private double longitude;
		}

		@Getter
		@Builder
		public static class DestinationDTO {
			@NotNull(message = "출발지 이름은 Null 일 수 없다.")
			private String name;
			@NotNull(message = "출발지 주소는 Null 일 수 없다.")
			private String address;
			@NotNull(message = "출발지 위도는 Null 일 수 없다.")
			private double latitude;
			@NotNull(message = "출발지 경도는 Null 일 수 없다.")
			private double longitude;
		}

		@Builder
		public ReservationDetailDTO(Reservation reservation, S3Util s3Util) {
			Optional.ofNullable(reservation.getOwner())
				.map(Owner::getUser)
				.ifPresent(user -> this.driver = DriverDTO.builder()
					.name(user.getName())
					.tel(user.getTel())
					.photo(s3Util.getImage(makeUserUrl(user.getPhoto())))
					.build());
			this.car = CarDTO.builder()
				.count(reservation.getCount())
				.model(reservation.getCar().getModel())
				.capacity(getCarEnumTypeToWeight(reservation.getCar().getType().getValue()))
				.feature(getSizeToString(reservation))
				.photo(s3Util.getImage(makeCarUrl(reservation.getCar().getPhoto())))
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
			this.cost = cutCost(reservation.getTransport().getFee());
			this.requiredTime = reservation.getTransport().getRequiredTime();
			this.status = TransportStatus.getCode(reservation.getTransport().getTransportStatus());
		}
	}
}
