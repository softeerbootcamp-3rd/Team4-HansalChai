package com.hansalchai.haul.order.service;

import java.util.List;

import static com.hansalchai.haul.common.utils.ErrorCode.*;
import static com.hansalchai.haul.order.dto.OrderSearchResponse.*;
import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.service.ReservationService.*;

import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.config.SmsUtil;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.common.exceptions.NotFoundException;
import com.hansalchai.haul.order.constants.OrderStatusCategory;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDTO;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDTO.OrderInfoDTO;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDetailDTO;

import com.hansalchai.haul.order.constants.OrderFilter;
import com.hansalchai.haul.order.dto.OrderSearchResponse;
import com.hansalchai.haul.order.dto.TransportStatusChange;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {

	private final UsersRepository usersRepository;
	private final ReservationRepository reservationRepository;
	private final OwnerRepository ownerRepository;
	private final SmsUtil smsUtil;

	@Transactional(readOnly = true)
	public OrderSearchResponse findAll(Long driverId, String sort, int page) {

		// 오더 리스트 조회를 위해 기사(Owner)의 차 id 탐색
		Owner owner = ownerRepository.findByDriverId(driverId)
			.orElseThrow(() -> new NotFoundException(OWNER_NOT_FOUND));
		Car car = owner.getCar();
		Long carId = car.getCarId();

		//페이지 정보 생성
		PageRequest pageRequest = PageRequest.of(page, PAGECUT);

		// 리스트 정렬 기준에 맞는 쿼리를 실행해 오더 리스트 조회
		OrderFilter orderFilter = OrderFilter.findFilter(sort);
		Page<Reservation> pages = orderFilter.execute(reservationRepository, carId, pageRequest);

		//필요한 정보만 담아 변환
		List<OrderSearchResponseDto> orders = pages.getContent().stream()
			.map(OrderSearchResponseDto::new)
			.toList();
		boolean isLastPage = pages.getNumberOfElements() <= PAGECUT;

		// 응답 형태로 변환해서 반환
		return new OrderSearchResponse(orders, isLastPage);
	}

	@Transactional
	public void approve(Long driverId, ApproveRequestDto approveRequestDto) {

		// 1. 예약 정보 가져오기
		Reservation reservation = reservationRepository.findById(approveRequestDto.getId())
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		// 1.5. 기사가 배정되어있으면 오더 승인 불가
		if (reservation.getOwner() != null) {
			throw new ConflictException(ALREADY_ASSIGNED_DRIVER);
		}

		// 2. 기사 정보 가져오기
		Owner owner = ownerRepository.findByDriverId(driverId)
			.orElseThrow(() -> new NotFoundException(OWNER_NOT_FOUND));

		// 3. 예약에 기사 배정 정보 저장, 운송 상태를 '운송 전'으로 변경
		reservation.setDriver(owner);
		Transport transport = reservation.getTransport();
		transport.updateTransportStatus(NOT_STARTED);

		// 4. 배정 알림을 고객에게 sms로 전송
		String customerTel = reservation.getUser().getTel();
		String reservationNumber = reservation.getNumber();
		smsUtil.send(customerTel, reservationNumber);
	}

	public OrderDTO getOrder(String keyword, int page, Long userId) {
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("User not found"));
		Pageable pageable = PageRequest.of(page,PAGECUT);
		Page<Reservation> pageContent = OrderStatusCategory.findOrderByCode(keyword).execute(user.getUserId(), pageable, reservationRepository);
		//Page<Reservation> pageContent = reservationRepository.findByDriverId(user.getUserId(), pageable);
		List<OrderInfoDTO> orderInfoDTOS = pageContent.getContent().stream().map(
			OrderInfoDTO::new).collect(Collectors.toList());
		boolean isLastPage = pageContent.getNumberOfElements() <= PAGECUT;
		return new OrderDTO(orderInfoDTOS, isLastPage);
	}

	public OrderDetailDTO getOrderDetail(Long id, Long userId) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Reservation not found"));
		return new OrderDetailDTO(reservation);
	}

	@Transactional
	public TransportStatusChange.ResponseDto changeTransportStatus(TransportStatusChange.RequestDto requestDto) {

		Reservation reservation = reservationRepository.findById(requestDto.getId())
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		// 다음 단계의 운송 상태 가져오기(운송 전 -> 운송 중, 운송 중 -> 운송 완료)
		Transport transport = reservation.getTransport();
		TransportStatus transportStatus = transport.getTransportStatus();

		//이미 운송 완료된 오더는 운송 상태를 변경할 수 없다
		if (transportStatus.equals(DONE)) {
			throw new BadRequestException(ALREADY_DELIVERED);
		}
		TransportStatus nextStatus = TransportStatus.getNextStatus(transportStatus);

		transport.updateTransportStatus(nextStatus);

		return new TransportStatusChange.ResponseDto(reservation);
	}
}
