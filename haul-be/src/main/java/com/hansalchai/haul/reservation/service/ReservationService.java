package com.hansalchai.haul.reservation.service;

import static com.hansalchai.haul.common.utils.ErrorCode.*;
import static com.hansalchai.haul.common.utils.ReservationUtil.*;
import static com.hansalchai.haul.reservation.dto.ReservationRequest.*;
import static com.hansalchai.haul.reservation.dto.ReservationResponse.*;
import static com.hansalchai.haul.reservation.dto.ReservationResponse.ReservationDTO.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.exceptions.ForbiddenException;
import com.hansalchai.haul.common.exceptions.NotFoundException;
import com.hansalchai.haul.common.utils.CarCategorySelector;
import com.hansalchai.haul.common.utils.CargoFeeTable;
import com.hansalchai.haul.common.utils.KaKaoMap.KakaoMap;
import com.hansalchai.haul.common.utils.MapUtils;
import com.hansalchai.haul.common.utils.ReservationNumberGenerator;
import com.hansalchai.haul.common.utils.S3Util;
import com.hansalchai.haul.reservation.constants.TransportStatus;
import com.hansalchai.haul.reservation.constants.TransportType;
import com.hansalchai.haul.reservation.entity.Cargo;
import com.hansalchai.haul.reservation.entity.CargoOption;
import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Source;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.CustomCarRepositoryImpl;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ReservationService{
	private final S3Util s3Util;
	private final KakaoMap kakaoMap;
	private final ReservationRepository reservationRepository;
	private final UsersRepository usersRepository;

	//querydsl
	private final CustomCarRepositoryImpl customCarRepository;
	public static final int PAGECUT = 10;
	/*
	1. 예약 dto에서 받아온 데이터로
	2. 트럭을 선택
	3. 예약을 생성 후 데이터 반환
	 */
	public ReservationRecommendationDTO createReservation(CreateReservationDTO reservationDTO,
		Long userId) {
		Users user = exceptionUserNotFound(userId);

		Source source = reservationDTO.getSrc().build();
		Destination destination = reservationDTO.getDst().build();
		Cargo cargo = reservationDTO.getCargo().build();
		CargoOption cargoOption = reservationDTO.getCargoOption().build();

		MapUtils.Location srcLocation = new MapUtils.Location(source.getLatitude(), source.getLongitude());
		MapUtils.Location dstLocation = new MapUtils.Location(destination.getLatitude(), destination.getLongitude());
		MapUtils.DistanceDurationInfo distanceDurationInfo = kakaoMap.carPathFind(srcLocation, dstLocation);
		//추천차량 계산
		List<Car> recommendedCars = customCarRepository.findProperCar(CarCategorySelector.selectCarCategory(cargoOption), cargo);
		//추천된 차량이 없을 때 예외처리 가격을 예상할 수 없음.
		carNotFound(recommendedCars);

		double transportDuration =  distanceDurationInfo.getDuration() + calculateLoadTime(cargo.getWeight());

		//차량을 기반으로 금액 계산
		CargoFeeTable.RequestedTruckInfo getTruck = CargoFeeTable.findCost(recommendedCars, distanceDurationInfo.getDistance(), cargo.getWeight());
		Transport transport = Transport.toEntity(TransportType.stringToEnum(reservationDTO.getTransportType()), getTruck.getCost(), transportDuration, TransportStatus.NOT_RESERVATED);
		//예약 번호
		String reservationNumber = generateUniqueReservationNumber();

		Reservation reservation = Reservation.toEntity(user, null, cargo, cargoOption,
			source, destination, transport, getTruck.getCar(), reservationNumber, reservationDTO.getDate(),reservationDTO.getTime(),
			distanceDurationInfo.getDistance(), getTruck.getNumber());

		Reservation saved = reservationRepository.save(reservation);

		return new ReservationRecommendationDTO(saved, s3Util);
	}

	public ReservationRecommendationDTO createGuestReservation(CreateReservationGuestDTO reservationDTO) {
		Source source = reservationDTO.getSrc().build();
		Destination destination = reservationDTO.getDst().build();
		Cargo cargo = reservationDTO.getCargo().build();
		CargoOption cargoOption = reservationDTO.getCargoOption().build();

		//출발지, 목적지 기반으로 거리, 걸리는 시간 계산
		MapUtils.Location srcLocation = new MapUtils.Location(source.getLatitude(), source.getLongitude());
		MapUtils.Location dstLocation = new MapUtils.Location(destination.getLatitude(), destination.getLongitude());
		MapUtils.DistanceDurationInfo distanceDurationInfo = kakaoMap.carPathFind(srcLocation, dstLocation);
		//추천차량 계산
		List<Car> recommendedCars = customCarRepository.findProperCar(CarCategorySelector.selectCarCategory(cargoOption), cargo);
		//추천된 차량이 없을 때 예외처리 가격을 예상할 수 없음.
		carNotFound(recommendedCars);

		double transportDuration =  distanceDurationInfo.getDuration() + calculateLoadTime(cargo.getWeight());
		//차량을 기반으로 금액 계산
		CargoFeeTable.RequestedTruckInfo getTruck = CargoFeeTable.findCost(recommendedCars, distanceDurationInfo.getDistance(), cargo.getWeight());
		Transport transport = Transport.toEntity(TransportType.stringToEnum(reservationDTO.getTransportType()), getTruck.getCost(), transportDuration, TransportStatus.NOT_RESERVATED);
		//예약 번호
		String reservationNumber = generateUniqueReservationNumber();

		Users guest = Users.toEntity(reservationDTO.getUserInfo().getName(),reservationDTO.getUserInfo().getTel(),reservationNumber, null, null, Role.GUEST);

		Reservation reservation = Reservation.toEntity(guest, null, cargo, cargoOption,
			source, destination, transport, getTruck.getCar(), reservationNumber, reservationDTO.getDate(),reservationDTO.getTime(),
			distanceDurationInfo.getDistance(), getTruck.getNumber());

		usersRepository.save(guest);
		Reservation saved = reservationRepository.save(reservation);

		return new ReservationRecommendationDTO(saved, s3Util);
	}

	public ReservationDTO getReservation(String keyword, int page, Long userId) {
		Users user = exceptionUserNotFound(userId);

		Pageable pageable = PageRequest.of(page,PAGECUT);
		Page<Reservation> pageContent = TransportStatus.findStatusByCode(keyword).execute(user.getUserId(), pageable, reservationRepository);
		List<ReservationInfoDTO> reservationInfoDTOS = pageContent.getContent().stream().map(ReservationInfoDTO::new).collect(Collectors.toList());

		boolean isLastPage = pageContent.getNumberOfElements() < PAGECUT;
		return new ReservationDTO(reservationInfoDTOS, isLastPage);
	}

	public ReservationDTO getGuestReservation(String number) {
		Reservation reservation = exceptionReservationNotFound(number);

		ReservationInfoDTO reservationInfoDTO = new ReservationInfoDTO(reservation);
		List<ReservationInfoDTO> reservationInfoDTOS = new ArrayList<>();
		reservationInfoDTOS.add(reservationInfoDTO);
		return new ReservationDTO(reservationInfoDTOS, true);
	}

	public ReservationDetailDTO getReservationDetail(Long id, Long userId) {
		Reservation reservation = exceptionReservationNotFound(id);

		exceptionForbiddenUser(reservation, userId);

		return new ReservationDetailDTO(reservation, s3Util);
	}

	public ReservationDetailDTO getGuestReservationDetail(Long id) {
		Reservation reservation = exceptionReservationNotFound(id);

		exceptionForbiddenGuest(reservation);

		return new ReservationDetailDTO(reservation, s3Util);
	}

	public void patchReservation(Long id, Long userId) {
		Reservation reservation = exceptionReservationNotFound(id);

		exceptionForbiddenUser(reservation, userId);
		exceptionInvalidReservationStateChange(reservation);

		changeReservationStatus(reservation);
	}

	public void patchGuestReservation(Long id) {
		Reservation reservation = exceptionReservationNotFound(id);

		exceptionForbiddenGuest(reservation);
		exceptionInvalidReservationStateChange(reservation);

		changeReservationStatus(reservation);
	}

	private String generateUniqueReservationNumber() {
		while (true) {
			String generatedNumber = ReservationNumberGenerator.generateUniqueId();
			if (reservationRepository.findByNumber(generatedNumber).isEmpty()) {
				return generatedNumber;
			}
		}
	}

	private void changeReservationStatus(Reservation reservation){
		reservation.getTransport().changeStatusReserved();
	}

	private Users exceptionUserNotFound(long userId){
		return usersRepository.findById(userId)
			.orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
	}

	private void carNotFound(List<Car> recommendedCars){
		if(recommendedCars.isEmpty()){
			throw new NotFoundException(CAR_NOT_FOUND);
		}
	}

	private Reservation exceptionReservationNotFound(long id){
		return reservationRepository.findById(id)
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
	}

	private Reservation exceptionReservationNotFound(String number){
		return reservationRepository.findByNumber(number)
			.orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
	}

	private void exceptionForbiddenUser(Reservation reservation, Long userId){
		if(!userId.equals(reservation.getUser().getUserId())){
			throw new ForbiddenException(UNAUTHORIZED_ACCESS);
		}
	}

	private void exceptionForbiddenGuest(Reservation reservation){
		if(!reservation.getUser().getRole().equals(Role.GUEST)){
			throw new ForbiddenException(UNAUTHORIZED_ACCESS);
		}
	}

	private void exceptionInvalidReservationStateChange(Reservation reservation){
		if(!reservation.getTransport().getTransportStatus().equals(TransportStatus.NOT_RESERVATED)){
			throw new ForbiddenException(INVALID_RESERVATION_STATE_CHANGE);
		}
	}
}