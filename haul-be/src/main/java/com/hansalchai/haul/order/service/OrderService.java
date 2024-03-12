package com.hansalchai.haul.order.service;

import static com.hansalchai.haul.common.utils.ErrorCode.*;
import static com.hansalchai.haul.common.utils.OrderUtil.*;
import static com.hansalchai.haul.common.utils.SidoGraph.*;
import static com.hansalchai.haul.order.dto.OrderRequest.*;
import static com.hansalchai.haul.order.dto.OrderResponse.*;
import static com.hansalchai.haul.order.dto.OrderResponse.OrderSearchResponseDto.*;
import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.service.ReservationService.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
import com.hansalchai.haul.common.exceptions.ForbiddenException;
import com.hansalchai.haul.common.exceptions.NotFoundException;
import com.hansalchai.haul.common.utils.AddressUtil;
import com.hansalchai.haul.common.utils.KaKaoMap.KakaoMap;
import com.hansalchai.haul.common.utils.SidoGraph;
import com.hansalchai.haul.order.constants.OrderFilter;
import com.hansalchai.haul.order.constants.OrderFilterV2;
import com.hansalchai.haul.order.constants.OrderStatusCategory;
import com.hansalchai.haul.order.dto.OrderResponse.OrderDTO.OrderInfoDTO;
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

	private final UsersRepository usersRepository;
	private final ReservationRepository reservationRepository;
	private final OwnerRepository ownerRepository;
	private final SmsUtil smsUtil;
	private final KakaoMap kakaoMap;
	private final CustomReservationRepositoryImpl customReservationRepository;

	@Transactional(readOnly = true)
	public OrderSearchResponseDto findAll(Long userId, String sort, int page) {

		Owner owner = findOwner(userId);
		Car car = owner.getCar();
		Long carId = car.getCarId();

		PageRequest pageRequest = PageRequest.of(page, PAGECUT);
		OrderFilter orderFilter = OrderFilter.findFilter(sort);
		Page<Reservation> pages = orderFilter.execute(reservationRepository, carId, pageRequest);

		List<OrderSearchItem> orders = pages.map(OrderSearchItem::new).toList();
		boolean isLastPage = pages.getNumberOfElements() < PAGECUT;

		return new OrderSearchResponseDto(orders, isLastPage);
	}

	public void approve(Long userId, ApproveRequestDto approveRequestDto) {

		Reservation reservation = findReservation(approveRequestDto.getId());

		if (isAlreadyAssignedDriverExist(reservation)) {
			throw new ConflictException(ALREADY_ASSIGNED_DRIVER);
		}

		// 예약에 기사 배정 정보 저장, 운송 상태를 '운송 전'으로 변경
		Owner owner = findOwner(userId);
		assignDriverToReservation(reservation, owner);
		sendAssignNotification(reservation);
	}

	private static boolean isAlreadyAssignedDriverExist(Reservation reservation) {
		return reservation.getOwner() != null;
	}

	private void sendAssignNotification(Reservation reservation) {
		String customerTel = reservation.getUser().getTel();
		String reservationNumber = reservation.getNumber();
		smsUtil.sendAssignNotification(customerTel, reservationNumber);
	}

	private static void assignDriverToReservation(Reservation reservation, Owner owner) {
		reservation.setDriver(owner);
		Transport transport = reservation.getTransport();
		transport.updateTransportStatus(NOT_STARTED);
	}

	public void approveV2(Long userId, ApproveRequestDto approveRequestDto) {

		Reservation reservation = reservationRepository.findByIdWithOptimisticLock(approveRequestDto.getId())
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));

		if (isAlreadyAssignedDriverExist(reservation)) {
			throw new ConflictException(ALREADY_ASSIGNED_DRIVER);
		}

		Owner owner = findOwner(userId);
		if (isScheduleOverlap(owner, reservation)) {
			throw new ConflictException(SCHEDULE_CONFLICT);
		}

		assignDriverToReservation(reservation, owner);
		sendAssignNotification(reservation);
	}

	/*
	 * 기사 일정 중첩 확인
	 * 기사 스케줄과 승인하려는 오더의 시간이 겹치는지 확인한다
	 * */
	private boolean isScheduleOverlap(Owner owner, Reservation newOrder) {

		long requiredTime = (long)(newOrder.getTransport().getRequiredTime() * 60);
		LocalDateTime newOrderStart = LocalDateTime.of(newOrder.getDate(), newOrder.getTime());
		LocalDateTime newOrderEnd = newOrderStart.plusMinutes(requiredTime);

		LocalDate today = newOrder.getDate();
		List<Reservation> myOrders = reservationRepository.findScheduleOfDriver(owner.getOwnerId(), today.minusDays(1),
			today);

		for (Reservation myOrder : myOrders) {
			if (isTimeOverlap(newOrderStart, newOrderEnd, myOrder)) {
				return true;
			}
		}
		return false;
	}

	private boolean isTimeOverlap(LocalDateTime newOrderStart, LocalDateTime newOrderEnd, Reservation myOrder) {
		long requiredTime = (long)(myOrder.getTransport().getRequiredTime() * 60);
		LocalDateTime myOrderStart = LocalDateTime.of(myOrder.getDate(), myOrder.getTime());
		LocalDateTime myOrderEnd = myOrderStart.plusMinutes(requiredTime);
		return !(
			(newOrderStart.isBefore(myOrderStart) && newOrderEnd.isBefore(myOrderStart))
				|| (newOrderStart.isAfter(myOrderEnd) && newOrderEnd.isAfter(myOrderEnd)));
	}

	public OrderDTO getOrder(String keyword, int page, Long userId) {
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

		Pageable pageable = PageRequest.of(page, PAGECUT);
		Page<Reservation> pageContent = OrderStatusCategory.findOrderByCode(keyword)
			.execute(user.getUserId(), pageable, reservationRepository);
		List<OrderInfoDTO> orderInfoDTOS = pageContent.getContent().stream().map(
			OrderInfoDTO::new).collect(Collectors.toList());

		boolean isLastPage = pageContent.getNumberOfElements() < PAGECUT;
		return new OrderDTO(orderInfoDTOS, isLastPage);
	}

	public OrderDetailDTO getOrderDetail(Long id) {
		Reservation reservation = findReservation(id);
		return new OrderDetailDTO(reservation);
	}

	public OrderDetailDTO getOrderMineDetail(Long id, Long userId) {
		Reservation reservation = findReservation(id);
		validateUser(userId, reservation);
		return new OrderDetailDTO(reservation);
	}

	public TransportStatusChangeResponseDto changeTransportStatus(Long userId,
		TransportStatusChangeRequestDto requestDto) {

		Reservation reservation = findReservation(requestDto.getId());
		validateUser(userId, reservation);

		Transport transport = reservation.getTransport();
		TransportStatus transportStatus = transport.getTransportStatus();
		if (isDone(transportStatus)) {
			throw new BadRequestException(ALREADY_DELIVERED);
		}

		transport.updateTransportStatus(TransportStatus.getNextStatus(transportStatus));
		return new TransportStatusChangeResponseDto(reservation);
	}

	private static boolean isDone(TransportStatus transportStatus) {
		return transportStatus.equals(DONE);
	}

	public OrderSearchResponseDto findAllV2(Long userId, String sort, int page, double latitude, double longitude) {

		Owner owner = findOwner(userId);
		Car car = owner.getCar();
		Long carId = car.getCarId();

		String curRegion = AddressUtil.kakaoAdressToSrcAddress(kakaoMap.searchRoadAddress(latitude, longitude));

		ArrayList<String> selectedSidoArray = null;
		int depthMAX = sidoSortedMap.get(curRegion).size();
		for (int i = 1; i <= depthMAX; i++) {
			ArrayList<String> sidoArray = SidoGraph.getSidoByDepth(curRegion, i);
			Long count = customReservationRepository.countAllOrdersQdsl(carId, sidoArray);
			selectedSidoArray = sidoArray;

			if (count >= (long)PAGECUT * (page + 1)) {
				break;
			}
		}

		PageRequest pageRequest = PageRequest.of(page, PAGECUT);
		OrderFilterV2 orderFilter = OrderFilterV2.findFilter(sort);
		List<Reservation> pages = orderFilter.execute(customReservationRepository, carId, selectedSidoArray,
			pageRequest);

		List<OrderSearchItem> orders = pages.stream()
			.map(OrderSearchItem::new)
			.toList();
		boolean isLastPage = pages.size() < PAGECUT;

		return new OrderSearchResponseDto(orders, isLastPage);
	}

	public TransportStatusChangeResponseDtoV2 changeTransportStatusV2(Long userId,
		TransportStatusChangeRequestDtoV2 requestDto) {

		Reservation reservation = findReservation(requestDto.getId());
		validateUser(userId, reservation);

		Transport transport = reservation.getTransport();
		TransportStatus transportStatus = transport.getTransportStatus();

		if (isDone(transportStatus)) {
			throw new BadRequestException(ALREADY_DELIVERED);
		}

		if (hasInProgressOrder(reservation.getReservationId(), userId)) {
			return TransportStatusChangeResponseDtoV2.ofInProgressOrderExist();
		}

		if (!isNearPoint(requestDto, reservation, transportStatus)) {
			return TransportStatusChangeResponseDtoV2.ofRemoteLocation();
		}

		TransportStatus nextStatus = TransportStatus.getNextStatus(transportStatus);
		transport.updateTransportStatus(nextStatus);
		return TransportStatusChangeResponseDtoV2.ofStatusChangeAvailable();
	}

	private Reservation findReservation(Long id) {
		return reservationRepository.findById(id)
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
	}

	private Owner findOwner(Long userId) {
		return ownerRepository.findByUserId(userId)
			.orElseThrow(() -> new NotFoundException(OWNER_NOT_FOUND));
	}

	/*
	 * 유저 검증
	 * 요청한 유저 id가 예약 ownerId랑 같아야 운송 상태를 변경할 수 있다.
	 **/
	private void validateUser(Long userId, Reservation reservation) {
		Owner owner = reservation.getOwner();
		if (!userId.equals(owner.getUser().getUserId())) {
			throw new ForbiddenException(UNAUTHORIZED_ACCESS);
		}
	}

	//운송 중인 오더가 있는지 확인
	private boolean hasInProgressOrder(Long id, Long userId) {
		List<Reservation> ordersInProgress = reservationRepository.findInProgressReservationByUserId(userId);
		return !ordersInProgress.stream().allMatch(order -> order.getReservationId().equals(id));
	}
}
