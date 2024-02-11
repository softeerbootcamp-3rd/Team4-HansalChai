package com.hansalchai.haul.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.utils.CarCategorySelector;
import com.hansalchai.haul.common.utils.CargoFeeTable;
import com.hansalchai.haul.common.utils.KaKaoMap.KakaoMap;
import com.hansalchai.haul.common.utils.MapUtils;
import com.hansalchai.haul.common.utils.ReservationNumberGenerator;
import com.hansalchai.haul.customer.entity.Customer;
import com.hansalchai.haul.driver.entity.Driver;
import com.hansalchai.haul.owner.repository.OwnerRepository;
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

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ReservationService{
	private KakaoMap kakaoMap;

	private final OwnerRepository ownerRepository;
	private final CargoRepository cargoRepository;
	private final CargoOptionRepository cargoOptionRepository;
	private final DestinationRepository destinationRepository;
	private final ReservationRepository reservationRepository;
	private final SourceRepository sourceRepository;
	private final TransportRepository transportRepository;

	//querydsl
	private final CustomCarRepositoryImpl customCarRepository;
	/*
	1. 예약 dto에서 받아온 데이터로
	2. 트럭을 선택
	3. 예약을 생성 후 데이터 반환
	 */
	public ReservationResponse.ReservationRecommendationDTO createReservation(ReservationRequest.CreateReservationDTO request) {
		//TODO 주문한 사람 연결
		Customer customer = new Customer();

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

		Reservation reservation = Reservation.builder()
			.customer(customer)
			.driver(null)
			.cargo(cargo)
			.cargoOption(cargoOption)
			.source(source)
			.destination(destination)
			.transport(transport)
			.number(reservationNumber)
			.date(request.getDate())
			.time(request.getTime())
			.distance(distanceDurationInfo.getDistance())
			.count(fee.getNumber())
			.build();

		cargoRepository.save(cargo);
		cargoOptionRepository.save(cargoOption);
		sourceRepository.save(source);
		destinationRepository.save(destination);
		transportRepository.save(transport);
		reservationRepository.save(reservation);

		//TODO Response 객체 생성후 반환
		Car recommendedCar = customCarRepository.findProperCar(CarType.findByValue(fee.getType()), CarCategorySelector.selectCarCategory(cargoOption));

		return null;
	}
}