package com.hansalchai.haul.order.service;

import java.util.ArrayList;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.hansalchai.haul.common.utils.ErrorCode.*;
import static com.hansalchai.haul.common.utils.OrderUtil.*;
import static com.hansalchai.haul.common.utils.SidoGraph.*;
import static com.hansalchai.haul.order.dto.OrderSearchResponse.*;
import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.service.ReservationService.*;

import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.config.SmsUtil;

import com.hansalchai.haul.common.exceptions.BadRequestException;
import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.common.exceptions.ForbiddenException;
import com.hansalchai.haul.common.exceptions.NotFoundException;
import com.hansalchai.haul.common.utils.AddressUtil;
import com.hansalchai.haul.common.utils.KaKaoMap.KakaoMap;
import com.hansalchai.haul.common.utils.SidoGraph;
import com.hansalchai.haul.order.constants.OrderFilterV2;
import com.hansalchai.haul.order.constants.OrderStatusCategory;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.dto.DriverPositionDto;
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
import com.hansalchai.haul.reservation.repository.CustomReservationRepositoryImpl;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class OrderService {
	Logger logger = LoggerFactory.getLogger(OrderService.class);

	private final UsersRepository usersRepository;
	private final ReservationRepository reservationRepository;
	private final OwnerRepository ownerRepository;
	private final SmsUtil smsUtil;
	private final KakaoMap kakaoMap;
	private final CustomReservationRepositoryImpl customReservationRepository;

	@Transactional(readOnly = true)
	public OrderSearchResponse findAll(Long userId, String sort, int page) {

		Owner owner = ownerRepository.findByUserId(userId)
			.orElseThrow(() -> new NotFoundException(OWNER_NOT_FOUND));
		Car car = owner.getCar();
		Long carId = car.getCarId();

		PageRequest pageRequest = PageRequest.of(page, PAGECUT);
		OrderFilter orderFilter = OrderFilter.findFilter(sort);
		Page<Reservation> pages = orderFilter.execute(reservationRepository, carId, pageRequest);

		List<OrderSearchResponseDto> orders = pages.map(OrderSearchResponseDto::new).toList();
		boolean isLastPage = pages.getNumberOfElements() < PAGECUT;

		return new OrderSearchResponse(orders, isLastPage);
	}

	public void approve(Long userId, ApproveRequestDto approveRequestDto) {

		Reservation reservation = reservationRepository.findById(approveRequestDto.getId())
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		// 기사가 배정되어있으면 오더 승인 불가
		if (reservation.getOwner() != null) {
			throw new ConflictException(ALREADY_ASSIGNED_DRIVER);
		}

		Owner owner = ownerRepository.findByUserId(userId)
			.orElseThrow(() -> new NotFoundException(OWNER_NOT_FOUND));

		// 예약에 기사 배정 정보 저장, 운송 상태를 '운송 전'으로 변경
		reservation.setDriver(owner);
		Transport transport = reservation.getTransport();
		transport.updateTransportStatus(NOT_STARTED);

		// 4. 배정 알림을 고객에게 sms로 전송
		// String customerTel = reservation.getUser().getTel();
		// String reservationNumber = reservation.getNumber();
		// smsUtil.send(customerTel, reservationNumber);
	}

	public void approveV2(Long userId, ApproveRequestDto approveRequestDto) {

		Reservation reservation = reservationRepository.findByIdWithPessimisticLock(approveRequestDto.getId())
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		// 기사가 배정되어있으면 오더 승인 불가
		if (reservation.getOwner() != null) {
			throw new ConflictException(ALREADY_ASSIGNED_DRIVER);
		}

		Owner owner = ownerRepository.findByUserId(userId)
			.orElseThrow(() -> new NotFoundException(OWNER_NOT_FOUND));

		// 겹치는 오더가 있으면 오더 승인 불가
		if (isScheduleOverlap(owner.getOwnerId(), reservation)) {
			throw new ConflictException(SCHEDULE_CONFLICT);
		}

		// 예약에 기사 배정 정보 저장, 운송 상태를 '운송 전'으로 변경
		reservation.setDriver(owner);
		Transport transport = reservation.getTransport();
		transport.updateTransportStatus(NOT_STARTED);

		// 4. 배정 알림을 고객에게 sms로 전송
		// String customerTel = reservation.getUser().getTel();
		// String reservationNumber = reservation.getNumber();
		// smsUtil.send(customerTel, reservationNumber);
	}

	private boolean isScheduleOverlap(Long ownerId, Reservation newOrder) {

		long requiredTime = (long)(newOrder.getTransport().getRequiredTime() * 60);
		LocalDateTime newOrderStartDateTime = LocalDateTime.of(newOrder.getDate(), newOrder.getTime());
		LocalDateTime newOrderEndDateTime = newOrderStartDateTime.plusMinutes(requiredTime);

		// 기사 스케줄 리스트 조회
		LocalDate today = newOrder.getDate();
		List<Reservation> myOrders
			= reservationRepository.findScheduleOfDriver(ownerId, today.minusDays(1), today);

		for (Reservation myOrder : myOrders) {
			requiredTime = (long)(myOrder.getTransport().getRequiredTime() * 60);
			LocalDateTime myOrderStartDateTime = LocalDateTime.of(myOrder.getDate(), myOrder.getTime());
			LocalDateTime myOrderEndDateTime = myOrderStartDateTime.plusMinutes(requiredTime);

			// 스케줄이 중첩되는 경우
			if (!((newOrderStartDateTime.isBefore(myOrderStartDateTime) && newOrderEndDateTime.isBefore(myOrderStartDateTime)) ||
				(newOrderStartDateTime.isAfter(myOrderEndDateTime) && newOrderEndDateTime.isAfter(myOrderEndDateTime)))) {
				return true;
			}
		}
		return false;
	}

	public OrderDTO getOrder(String keyword, int page, Long userId) {
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

		Pageable pageable = PageRequest.of(page,PAGECUT);
		Page<Reservation> pageContent = OrderStatusCategory.findOrderByCode(keyword).execute(user.getUserId(), pageable, reservationRepository);
		List<OrderInfoDTO> orderInfoDTOS = pageContent.getContent().stream().map(
			OrderInfoDTO::new).collect(Collectors.toList());

		boolean isLastPage = pageContent.getNumberOfElements() < PAGECUT;
		return new OrderDTO(orderInfoDTOS, isLastPage);
	}

	public OrderDetailDTO getOrderDetail(Long id) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		return new OrderDetailDTO(reservation);
	}

	public OrderDetailDTO getOrderMineDetail(Long id, Long userId) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		Owner owner = reservation.getOwner();
		if(!userId.equals(owner.getUser().getUserId())){
			throw new ForbiddenException(UNAUTHORIZED_ACCESS);
		}

		return new OrderDetailDTO(reservation);
	}

	public TransportStatusChange.ResponseDto changeTransportStatus(Long userId, TransportStatusChange.RequestDto requestDto) {

		Reservation reservation = reservationRepository.findById(requestDto.getId())
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		//요청한 유저 id가 예약 ownerId랑 같아야 운송 상태를 변경할 수 있다.
		Owner owner = reservation.getOwner();
		if (!userId.equals(owner.getUser().getUserId())) {
			throw new ForbiddenException(UNAUTHORIZED_ACCESS);
		}

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

	public OrderSearchResponse findAllV2(Long userId, String sort, int page, DriverPositionDto requestDto) {
		// 오더 리스트 조회를 위해 기사(Owner)의 차 id 탐색
		Owner owner = ownerRepository.findByUserId(userId)
			.orElseThrow(() -> new NotFoundException(OWNER_NOT_FOUND));
		Car car = owner.getCar();
		Long carId = car.getCarId();

		String curRegion = AddressUtil.kakaoAdressToSrcAddress(kakaoMap.searchRoadAddress(requestDto.getLatitude(), requestDto.getLongitude()));


		ArrayList<String> selectedSidoArray = null;
		int depthMAX = sidoSortedMap.get(curRegion).size();
		for(int i = 1;i <= depthMAX;i++){
			ArrayList<String> sidoArray = SidoGraph.getSidoByDepth(curRegion, i);
			Long count = customReservationRepository.countAllOrdersQdsl(carId, sidoArray);
			selectedSidoArray = sidoArray;

			if(count >= (long)PAGECUT * (page + 1)){
				break;
			}
		}

		//페이지 정보 생성
		PageRequest pageRequest = PageRequest.of(page, PAGECUT);

		// 리스트 정렬 기준에 맞는 쿼리를 실행해 오더 리스트 조회
		OrderFilterV2 orderFilter = OrderFilterV2.findFilter(sort);
		List<Reservation> pages = orderFilter.execute(customReservationRepository, carId, selectedSidoArray, pageRequest);

		//필요한 정보만 담아 변환
		List<OrderSearchResponseDto> orders = pages.stream()
			.map(OrderSearchResponseDto::new)
			.toList();
		boolean isLastPage = pages.size() < PAGECUT;

		// 응답 형태로 변환해서 반환
		return new OrderSearchResponse(orders, isLastPage);
	}

	public TransportStatusChange.ResponseDtoV2 changeTransportStatusV2(
			Long userId,
			TransportStatusChange.RequestDtoV2 requestDto) {

		Reservation reservation = reservationRepository.findById(requestDto.getId())
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		Owner owner = reservation.getOwner();
		if (!userId.equals(owner.getUser().getUserId())) {
			throw new ForbiddenException(UNAUTHORIZED_ACCESS);
		}

		Transport transport = reservation.getTransport();
		TransportStatus transportStatus = transport.getTransportStatus();

		if (transportStatus.equals(DONE)) {
			throw new BadRequestException(ALREADY_DELIVERED);
		}

		if (hasInProgressOrder(reservation.getReservationId(), userId)) {
			return TransportStatusChange.ResponseDtoV2.builder()
				.hasInProgressOrder(true)
				.isDriverNearBy(false)
				.build();
		}

		if (!isNearPoint(requestDto, reservation, transportStatus)) {
			return TransportStatusChange.ResponseDtoV2.builder()
				.hasInProgressOrder(false)
				.isDriverNearBy(false)
				.build();
		}

		TransportStatus nextStatus = TransportStatus.getNextStatus(transportStatus);
		transport.updateTransportStatus(nextStatus);
		return TransportStatusChange.ResponseDtoV2.builder()
			.hasInProgressOrder(false)
			.isDriverNearBy(true)
			.build();
	}

	//운송 중인 오더가 있는지 확인
	private boolean hasInProgressOrder(Long id, Long userId) {
		List<Reservation> ordersInProgress = reservationRepository.findInProgressReservationByUserId(userId);
		return !ordersInProgress.stream().allMatch(order -> order.getReservationId().equals(id));
	}
}
