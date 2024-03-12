package com.hansalchai.haul.reservation.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.validator.constraints.Range;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.common.utils.BaseTime;
import com.hansalchai.haul.common.utils.ErrorCode;
import com.hansalchai.haul.common.utils.ReservationNumberGenerator;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.user.entity.Users;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE reservation SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "reservation")
public class Reservation extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reservationId;

	@ManyToOne(fetch = FetchType.LAZY)
	private Users user;

	@ManyToOne(fetch = FetchType.LAZY)
	private Owner owner;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private Cargo cargo;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private CargoOption cargoOption;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private Source source;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private Destination destination;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private Transport transport;

	@ManyToOne(fetch = FetchType.LAZY)
	private Car car;

	@Column(nullable = false)
	@Size(min = ReservationNumberGenerator.LENGTH, max = ReservationNumberGenerator.LENGTH)
	private String number;

	@Column(nullable = false)
	private LocalDate date;

	@Column(nullable = false)
	private LocalTime time;

	@Range(min = 0, max = 10)
	@Column(nullable = false)
	private int count;

	@Column(nullable = false)
	private double distance;

	@Version
	private Long version;

	@Builder
	public Reservation(Long reservationId, Users user, Owner owner, Cargo cargo, CargoOption cargoOption, Source source,
		Destination destination, Transport transport, Car car, String number, LocalDate date, LocalTime time, int count,
		double distance) {
		this.reservationId = reservationId;
		this.user = user;
		this.owner = owner;
		this.cargo = cargo;
		this.cargoOption = cargoOption;
		this.source = source;
		this.destination = destination;
		this.transport = transport;
		this.car = car;
		this.number = number;
		this.date = date;
		this.time = time;
		this.count = count;
		this.distance = distance;
	}

	public static Reservation toEntity(Users user, Owner owner, Cargo cargo, CargoOption cargoOption, Source source,
		Destination destination, Transport transport, Car car, String number, LocalDate date, LocalTime time,
		double distance, int count) {
		return Reservation.builder()
			.user(user)
			.owner(owner)
			.cargo(cargo)
			.cargoOption(cargoOption)
			.source(source)
			.destination(destination)
			.transport(transport)
			.car(car)
			.number(number)
			.date(date)
			.time(time)
			.distance(distance)
			.count(count)
			.build();
	}

	public void setDriver(Owner owner) {
		if (this.owner == null) {
			this.owner = owner;
			return;
		}
		throw new ConflictException(ErrorCode.ALREADY_ASSIGNED_DRIVER);
	}
}
