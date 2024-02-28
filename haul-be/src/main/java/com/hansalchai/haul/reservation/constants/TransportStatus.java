package com.hansalchai.haul.reservation.constants;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

public enum TransportStatus {
	NOT_RESERVATED("예약 전") {
		@Override
		public Page<Reservation> execute(Long carId, Pageable pageable, ReservationRepository reservationRepository) {
			return null;
		}
	},
	PENDING("매칭 중") {
		@Override
		public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository reservationRepository) {
			return reservationRepository.findByUserIdAndTransportStatus(id, TransportStatus.PENDING, pageable);
		}
	},
	NOT_STARTED("운송 전") {
		@Override
		public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository reservationRepository) {
			return reservationRepository.findByUserIdAndTransportStatus(id, TransportStatus.NOT_STARTED, pageable);
		}
	},
	IN_PROGRESS("운송 중") {
		@Override
		public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository reservationRepository) {
			return reservationRepository.findByUserIdAndTransportStatus(id, TransportStatus.IN_PROGRESS, pageable);
		}
	},
	DONE("운송 완료") {
		@Override
		public Page<Reservation> execute(Long id, Pageable pageable, ReservationRepository reservationRepository) {
			return reservationRepository.findByUserIdAndTransportStatus(id, TransportStatus.DONE, pageable);
		}
	};

	private final String code;

	TransportStatus(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public abstract Page<Reservation> execute(Long carId, Pageable pageable,
		ReservationRepository reservationRepository);

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
