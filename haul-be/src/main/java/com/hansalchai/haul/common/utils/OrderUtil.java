package com.hansalchai.haul.common.utils;

import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static java.lang.Math.*;

import com.hansalchai.haul.order.dto.TransportStatusChange;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Source;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OrderUtil {

	private static final int R = 6371000; // 지구의 반지름 (단위: 미터)

	//사용자 현위치가 출발지, 목적지 300m 내에 있는지 확인
	public static boolean isNearPoint(TransportStatusChange.RequestDtoV2 requestDto, Reservation reservation,
		TransportStatus transportStatus) {

		double currentLatitude = requestDto.getLatitude();
		double currentLongitude = requestDto.getLongitude();

		double pointLatitude = 0;
		double pointLongitude = 0;

		if (transportStatus.equals(NOT_STARTED)) {
			Source source = reservation.getSource();
			pointLatitude = source.getLatitude();
			pointLongitude = source.getLongitude();
		}
		if (transportStatus.equals(IN_PROGRESS)) {
			Destination destination = reservation.getDestination();
			pointLatitude = destination.getLatitude();
			pointLongitude = destination.getLongitude();
		}

		return calculateDistance(currentLatitude, currentLongitude, pointLatitude, pointLongitude) <= 300;
	}

	// 경도, 위도 기반 거리 계산
	public static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {

		double dLat = toRadians(lat2 - lat1);
		double dLon = toRadians(lon2 - lon1);

		double angleBetweenPoints = sin(dLat / 2) * sin(dLat / 2)
			+ cos(toRadians(lat1)) * cos(toRadians(lat2)) * sin(dLon / 2) * sin(dLon / 2);

		var midAngleDifference = 2 * Math.atan2(Math.sqrt(angleBetweenPoints), Math.sqrt(1 - angleBetweenPoints));

		return R * midAngleDifference;
	}
}
