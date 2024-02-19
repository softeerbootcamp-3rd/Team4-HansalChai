package com.hansalchai.haul.reservation.service;

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

import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.utils.CarCategorySelector;
import com.hansalchai.haul.common.utils.CargoFeeTable;
import com.hansalchai.haul.common.utils.KaKaoMap.KakaoMap;
import com.hansalchai.haul.common.utils.MapUtils;
import com.hansalchai.haul.common.utils.ReservationNumberGenerator;
import com.hansalchai.haul.common.utils.S3Util;
import com.hansalchai.haul.order.constants.OrderStatusCategory;
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
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("User not found"));
		Source source = reservationDTO.getSrc().build();
		Destination destination = reservationDTO.getDst().build();
		Cargo cargo = reservationDTO.getCargo().build();
		CargoOption cargoOption = reservationDTO.getCargoOption().build();

		//TODO 리팩토링 도움
		MapUtils.Location srcLocation = new MapUtils.Location(source.getLatitude(), source.getLongitude());
		MapUtils.Location dstLocation = new MapUtils.Location(destination.getLatitude(), destination.getLongitude());
		MapUtils.DistanceDurationInfo distanceDurationInfo = kakaoMap.carPathFind(srcLocation, dstLocation);
		//추천차량 계산
		List<Car> recommendedCars = customCarRepository.findProperCar(CarCategorySelector.selectCarCategory(cargoOption), cargo);
		if(recommendedCars.isEmpty()){
			throw new IllegalArgumentException("Recommended cars list is empty");
		}
		//차량을 기반으로 금액 계산
		CargoFeeTable.RequestedTruckInfo getTruck = CargoFeeTable.findCost(recommendedCars, distanceDurationInfo.getDistance(), cargo.getWeight());
		Transport transport = Transport.toEntity(TransportType.stringToEnum(reservationDTO.getTransportType()), getTruck.getCost(),distanceDurationInfo.getDuration());
		//예약 번호
		String reservationNumber = ReservationNumberGenerator.generateUniqueId();

		Reservation reservation = Reservation.toEntity(user, null, cargo, cargoOption,
				source, destination, transport, getTruck.getCar(), reservationNumber, reservationDTO.getDate(),reservationDTO.getTime(),
				distanceDurationInfo.getDuration(), getTruck.getNumber());

		Reservation saved = reservationRepository.save(reservation);

		return new ReservationRecommendationDTO(saved, s3Util);
	}

	public ReservationRecommendationDTO createGuestReservation(CreateReservationGuestDTO reservationDTO) {
		Source source = reservationDTO.getSrc().build();
		Destination destination = reservationDTO.getDst().build();
		Cargo cargo = reservationDTO.getCargo().build();
		CargoOption cargoOption = reservationDTO.getCargoOption().build();

		MapUtils.Location srcLocation = new MapUtils.Location(source.getLatitude(), source.getLongitude());
		MapUtils.Location dstLocation = new MapUtils.Location(destination.getLatitude(), destination.getLongitude());
		MapUtils.DistanceDurationInfo distanceDurationInfo = kakaoMap.carPathFind(srcLocation, dstLocation);
		//추천차량 계산
		List<Car> recommendedCars = customCarRepository.findProperCar(CarCategorySelector.selectCarCategory(cargoOption), cargo);
		if(recommendedCars.isEmpty()){
			throw new IllegalArgumentException("Recommended cars list is empty");
		}

		//차량을 기반으로 금액 계산
		CargoFeeTable.RequestedTruckInfo getTruck = CargoFeeTable.findCost(recommendedCars, distanceDurationInfo.getDistance(), cargo.getWeight());
		Transport transport = Transport.toEntity(TransportType.stringToEnum(reservationDTO.getTransportType()), getTruck.getCost(),distanceDurationInfo.getDuration());
		//예약 번호
		String reservationNumber = ReservationNumberGenerator.generateUniqueId();

		Users guest = Users.toEntity(reservationDTO.getUserInfo().getName(),reservationDTO.getUserInfo().getTel(),reservationNumber, null, null, Role.GUEST);

		Reservation reservation = Reservation.toEntity(guest, null, cargo, cargoOption,
			source, destination, transport, getTruck.getCar(), reservationNumber, reservationDTO.getDate(),reservationDTO.getTime(),
			distanceDurationInfo.getDuration(), getTruck.getNumber());

		usersRepository.save(guest);
		reservationRepository.save(reservation);

		Reservation saved = reservationRepository.save(reservation);

		return new ReservationRecommendationDTO(saved, s3Util);
	}

	public ReservationDTO getReservation(String keyword, int page, Long userId) {
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("User not found"));
		Pageable pageable = PageRequest.of(page,PAGECUT);
		Page<Reservation> pageContent = TransportStatus.findStatusByCode(keyword).execute(user.getUserId(), pageable, reservationRepository);
		List<ReservationInfoDTO> reservationInfoDTOS = pageContent.getContent().stream().map(ReservationInfoDTO::new).collect(Collectors.toList());
		boolean isLastPage = pageContent.getNumberOfElements() <= PAGECUT;
		return new ReservationDTO(reservationInfoDTOS, isLastPage);
	}

	public ReservationDTO getGuestReservation(String number) {
		Reservation reservation = reservationRepository.findByNumber(number)
			.orElseThrow(() -> new RuntimeException("Reservation not found"));
		ReservationInfoDTO reservationInfoDTO = new ReservationInfoDTO(reservation);
		List<ReservationInfoDTO> reservationInfoDTOS = new ArrayList<>();
		reservationInfoDTOS.add(reservationInfoDTO);
		return new ReservationDTO(reservationInfoDTOS, true);
	}

	public ReservationDetailDTO getReservationDetail(Long id, Long userId) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Reservation not found"));
		return new ReservationDetailDTO(reservation, s3Util);
	}

	public ReservationDetailDTO getGuestReservationDetail(Long id) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Reservation not found"));
		return new ReservationDetailDTO(reservation, s3Util);
	}

	public void patchReservation(Long id, Long userId) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Reservation not found"));
		changeReservationStatus(reservation);
	}

	public void patchGuestReservation(Long id) {
		Reservation reservation = reservationRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Reservation not found"));
		changeReservationStatus(reservation);
	}

	public void changeReservationStatus(Reservation reservation){
		reservation.getTransport().changeStatusReserved();
	}
}