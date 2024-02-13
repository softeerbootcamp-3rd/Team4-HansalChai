package com.hansalchai.haul.reservation.service;

import static com.hansalchai.haul.reservation.dto.ReservationRequest.*;
import static com.hansalchai.haul.reservation.dto.ReservationResponse.*;

import org.springframework.stereotype.Service;

import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.utils.CarCategorySelector;
import com.hansalchai.haul.common.utils.CargoFeeTable;
import com.hansalchai.haul.common.utils.KaKaoMap.KakaoMap;
import com.hansalchai.haul.common.utils.MapUtils;
import com.hansalchai.haul.common.utils.ReservationNumberGenerator;
import com.hansalchai.haul.customer.entity.Customer;
import com.hansalchai.haul.customer.repository.CustomerRepository;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.entity.Cargo;
import com.hansalchai.haul.reservation.entity.CargoOption;
import com.hansalchai.haul.reservation.entity.Destination;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Source;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.CargoOptionRepository;
import com.hansalchai.haul.reservation.repository.CargoRepository;
import com.hansalchai.haul.reservation.repository.CustomCarRepositoryImpl;
import com.hansalchai.haul.reservation.repository.DestinationRepository;
import com.hansalchai.haul.reservation.repository.ReservationRepository;
import com.hansalchai.haul.reservation.repository.SourceRepository;
import com.hansalchai.haul.reservation.repository.TransportRepository;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ReservationService{
	private final KakaoMap kakaoMap;
	private final CargoRepository cargoRepository;
	private final CargoOptionRepository cargoOptionRepository;
	private final DestinationRepository destinationRepository;
	private final ReservationRepository reservationRepository;
	private final SourceRepository sourceRepository;
	private final TransportRepository transportRepository;
	private final CustomerRepository customerRepository;
	private final UsersRepository usersRepository;

	//querydsl
	private final CustomCarRepositoryImpl customCarRepository;
	/*
	1. 예약 dto에서 받아온 데이터로
	2. 트럭을 선택
	3. 예약을 생성 후 데이터 반환
	 */
	public ReservationRecommendationDTO createReservation(CreateReservationDTO request,
		Long userId) {
		Users user = usersRepository.findById(userId).get();

		Source source = request.getSrc().build();
		Destination destination = request.getDst().build();
		Cargo cargo = request.getCargo().build();
		CargoOption cargoOption = request.getCargoOption().build();

		//TODO 리팩토링 도움
		MapUtils.Location srcLocation = new MapUtils.Location(source.getLatitude(), source.getLongitude());
		MapUtils.Location dstLocation = new MapUtils.Location(destination.getLatitude(), destination.getLongitude());
		MapUtils.DistanceDurationInfo distanceDurationInfo = kakaoMap.carPathFind(srcLocation, dstLocation);
		CargoFeeTable.RequestedTruckInfo fee = CargoFeeTable.findCost(cargo.getWeight(), distanceDurationInfo.getDistance());

		Transport transport = Transport.builder()
			.type(request.getTransportType())
			.fee(fee.getCost())
			.requiredTime(distanceDurationInfo.getDuration())
			.build();

		String reservationNumber = ReservationNumberGenerator.generateUniqueId();
		Car recommendedCar = customCarRepository.findProperCar(CarType.findByValue(fee.getType()), CarCategorySelector.selectCarCategory(cargoOption), cargo);

		Reservation reservation = Reservation.toEntity(user, null, cargo, cargoOption,
				source, destination, transport, recommendedCar, reservationNumber, request.getDate(),request.getTime(),
				distanceDurationInfo.getDuration(), fee.getNumber());

		reservationRepository.save(reservation);

		return new ReservationRecommendationDTO(reservation,
			distanceDurationInfo.getDuration());
	}

	public ReservationRecommendationDTO createGuestReservation(CreateReservationGuestDTO request) {
		Source source = request.getSrc().build();
		Destination destination = request.getDst().build();
		Cargo cargo = request.getCargo().build();
		CargoOption cargoOption = request.getCargoOption().build();

		//TODO 리팩토링 도움
		MapUtils.Location srcLocation = new MapUtils.Location(source.getLatitude(), source.getLongitude());
		MapUtils.Location dstLocation = new MapUtils.Location(destination.getLatitude(), destination.getLongitude());
		MapUtils.DistanceDurationInfo distanceDurationInfo = kakaoMap.carPathFind(srcLocation, dstLocation);
		CargoFeeTable.RequestedTruckInfo fee = CargoFeeTable.findCost(cargo.getWeight(), distanceDurationInfo.getDistance());

		Transport transport = Transport.builder()
			.type(request.getTransportType())
			.fee(fee.getCost())
			.requiredTime(distanceDurationInfo.getDuration())
			.build();

		String reservationNumber = ReservationNumberGenerator.generateUniqueId();
		Car recommendedCar = customCarRepository.findProperCar(CarType.findByValue(fee.getType()), CarCategorySelector.selectCarCategory(cargoOption), cargo);

		Users guest = Users.toEntity(request.getUserInfoDTO().getName(),request.getUserInfoDTO().getTel(),reservationNumber, null, null, Role.GUEST);

		Reservation reservation = Reservation.toEntity(guest, null, cargo, cargoOption,
			source, destination, transport, recommendedCar, reservationNumber, request.getDate(),request.getTime(),
			distanceDurationInfo.getDuration(), fee.getNumber());

		usersRepository.save(guest);
		reservationRepository.save(reservation);

		return new ReservationRecommendationDTO(reservation,
			distanceDurationInfo.getDuration());
	}
}