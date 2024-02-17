package com.hansalchai.haul.order.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.hansalchai.haul.reservation.entity.Reservation;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

public class OrderResponse {
	@Getter
	public static class OrderDTO{
		List<OrderInfoDTO> orderInfoDTOS;
		boolean isLastPage;

		public OrderDTO(List<OrderInfoDTO> orderInfoDTOS, boolean isLastPage) {
			this.orderInfoDTOS = orderInfoDTOS;
			this.isLastPage = isLastPage;
		}

		@Getter
		public static class OrderInfoDTO{
			private final Long id;
			private final String src;
			private final String dst;
			private final String datetime;
			private final int cost;
			@Builder
			public OrderInfoDTO(Reservation reservation) {
				this.id = reservation.getReservationId();
				//TODO 수정 필요 지애님 코드 받고 수정하기
				this.src = reservation.getSource().getAddress();
				this.dst = reservation.getDestination().getAddress();
				this.datetime = getDateTimeString(reservation.getDate(), reservation.getTime());
				this.cost = costCut(reservation.getTransport().getFee());
			}

			public int costCut(int fee){
				if(fee < 10000)
					return 1;
				return fee/10000;
			}

			public String getDateTimeString(LocalDate date, LocalTime time) {
				return date.toString() + " " + time.toString();
			}
		}
	}

	@Getter
	public static class OrderDetailDTO{
		private final UserDTO user;
		private final SourceDTO src;
		private final DestinationDTO dst;
		@NotNull(message = "비용은 Null 일 수 없다.")
		private final int cost;
		@NotNull(message = "걸리는시간은 Null 일 수 없다.")
		private final double requiredTime;

		@Getter
		@Builder
		public static class UserDTO{
			private String name;
			private String tel;
		}

		@Getter
		@Builder
		public static class SourceDTO{
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
		public static class DestinationDTO{
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
		public OrderDetailDTO(Reservation reservation) {
			this.user = UserDTO.builder()
				.name(reservation.getUser().getName())
				.tel(reservation.getUser().getTel())
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
			this.cost = costCut(reservation.getTransport().getFee());
			this.requiredTime = reservation.getTransport().getRequiredTime();
		}
		public int costCut(int fee){
			if(fee < 10000)
				return 1;
			return fee/10000;
		}
	}
}
