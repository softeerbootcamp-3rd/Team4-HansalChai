package com.hansalchai.haul.reservation.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.validator.constraints.Range;

import com.hansalchai.haul.common.utils.BaseTime;
import com.hansalchai.haul.customer.entity.Customer;
import com.hansalchai.haul.driver.entity.Driver;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
	private Customer customer;

	@ManyToOne(fetch = FetchType.LAZY)
	private Driver driver;

	@OneToOne(fetch = FetchType.LAZY)
	private Cargo cargo;

	@OneToOne(fetch = FetchType.LAZY)
	private CargoOption cargoOption;

	@OneToOne(fetch = FetchType.LAZY)
	private Source source;

	@OneToOne(fetch = FetchType.LAZY)
	private Destination destination;

	@OneToOne(fetch = FetchType.LAZY)
	private Transport transport;

	@Column(nullable = false)
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


	@Builder
	public Reservation(Customer customer, Driver driver, Cargo cargo, CargoOption cargoOption, Source source,
		Destination destination, Transport transport, String number, LocalDate date, LocalTime time, int count,
		double distance) {
		this.customer = customer;
		this.driver = driver;
		this.cargo = cargo;
		this.cargoOption = cargoOption;
		this.source = source;
		this.destination = destination;
		this.transport = transport;
		this.number = number;
		this.date = date;
		this.time = time;
		this.count = count;
		this.distance = distance;
	}
}
