package com.hansalchai.haul.reservation.constants;

import org.apache.commons.lang3.function.TriFunction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.order.constants.OrderStatusCategory;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

public enum TransportStatus {
	NOT_RESERVATED("예약 전", null),
	PENDING("매칭 중", (id,pageable, repo) -> repo.findByUserId(id, "PENDING",pageable)),
	NOT_STARTED("운송 전", (id,pageable, repo) -> repo.findByUserId(id, "NOT_STARTED",pageable)),
	IN_PROGRESS("운송 중", (id,pageable, repo) -> repo.findByUserId(id, "IN_PROGRESS",pageable)),
	DONE("운송 완료", (id,pageable, repo) -> repo.findByUserId(id, "DONE",pageable));

	private final String code;
	private final TriFunction<Long, Pageable, ReservationRepository, Page<Reservation>> function;

	TransportStatus(String code, TriFunction<Long, Pageable, ReservationRepository, Page<Reservation>> function) {
		this.code = code;
		this.function = function;
	}

	public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository repository) {
		return function.apply(id, pageable, repository);
	}

	public String getCode() {
		return code;
	}

	public static String getCode(TransportStatus status) {
		return status.getCode();
	}

	public static TransportStatus findStatusByCode(String code) {
		for (TransportStatus status : TransportStatus.values()) {
			if (status.getCode().equals(code)) {
				return status;
			}
		}
		throw new BadRequestException(ErrorCode.UNSUPPORTED_QUERY_VALUE);
	}

	// 다음 단계의 운송 상태를 반환
	public static TransportStatus getNextStatus(TransportStatus currentStatus) {
		if (currentStatus == NOT_STARTED) {
			return IN_PROGRESS;
		}
		return DONE;
	}
}
