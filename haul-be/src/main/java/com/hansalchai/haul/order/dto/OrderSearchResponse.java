package com.hansalchai.haul.order.dto;

import static com.hansalchai.haul.common.utils.AddressUtil.*;
import static com.hansalchai.haul.common.utils.ReservationUtil.*;

import java.util.List;

import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Source;
import com.hansalchai.haul.reservation.entity.Transport;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderSearchResponse {

	private List<OrderSearchResponseDto> orderSearchDtos;
	private boolean isLastPage;

	public OrderSearchResponse(List<OrderSearchResponseDto> orderSearchDtos, boolean isLastPage) {
		this.orderSearchDtos = orderSearchDtos;
		this.isLastPage = isLastPage;
	}

	@Getter
	@NoArgsConstructor
	public static class OrderSearchResponseDto {

		private Long id;
		private String srcSimpleAddress;
		private String dstSimpleAddress;
		private String transportDatetime;
		private int cost;

		public OrderSearchResponseDto(Reservation reservation) {

			Source source = reservation.getSource();
			Destination destination = reservation.getDestination();
			Transport transport = reservation.getTransport();

			id = reservation.getReservationId();
			srcSimpleAddress = toSimpleAddress(source.getAddress());
			dstSimpleAddress = toSimpleAddress(destination.getAddress());
			transportDatetime = dateTimeToString(reservation.getDate(), reservation.getTime());
			cost = cutCost(transport.getFee());
		}
	}
}
