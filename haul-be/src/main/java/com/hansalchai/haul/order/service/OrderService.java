package com.hansalchai.haul.order.service;

import static com.hansalchai.haul.reservation.constants.TransportStatus.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hansalchai.haul.common.config.SmsUtil;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDTO;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDTO.OrderInfoDTO;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDetailDTO;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {
	private final UsersRepository usersRepository;
	private final ReservationRepository reservationRepository;
	private final OwnerRepository ownerRepository;
	private final SmsUtil smsUtil;
	private final int PAGECUT = 10;
	@Transactional
	public void approve(Long driverId, ApproveRequestDto approveRequestDto) {

		// 1. 예약 정보 가져오기
		Reservation reservation = reservationRepository.findById(approveRequestDto.getReservationId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 예약번호입니다."));

		// 2. 기사 정보 가져오기
		Owner owner = ownerRepository.findByDriverId(driverId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 owner입니다."));

		// 3. 예약에 기사 배정 정보 저장, 운송 상태를 '운송 전'으로 변경
		reservation.setDriver(owner);
		Transport transport = reservation.getTransport();
		transport.updateTransportStatus(NOT_STARTED);

		// 4. 배정 알림을 고객에게 sms로 전송
		String customerTel = reservation.getUser().getTel();
		String reservationNumber = reservation.getNumber();
		smsUtil.send(customerTel, reservationNumber);
	}

	public OrderDTO getOrder(int page, Long userId) {
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("User not found"));
		Pageable pageable = PageRequest.of(page,PAGECUT);
		Page<Reservation> pageContent = reservationRepository.findByDriverId(user.getUserId(), pageable);
		List<OrderInfoDTO> orderInfoDTOS = pageContent.getContent().stream().map(
			OrderInfoDTO::new).collect(Collectors.toList());
		boolean isLastPage = pageContent.getNumberOfElements() < PAGECUT;
		return new OrderDTO(orderInfoDTOS, isLastPage);
	}

	public OrderDetailDTO getOrderDetail(Long id, Long userId) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Reservation not found"));
		return new OrderDetailDTO(reservation);
	}
}
