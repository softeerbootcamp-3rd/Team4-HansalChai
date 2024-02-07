package com.hansalchai.haul.reservation.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.hansalchai.haul.common.utils.BaseTime;
import com.hansalchai.haul.customer.entity.Customer;
import com.hansalchai.haul.driver.entity.Driver;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
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
	private int reservationId;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Customer customer;

	@Nullable
	@ManyToOne(fetch = FetchType.LAZY)
	private Driver driver;

	@NotNull(message = "예약번호는 Null 일 수 없다.")
	private String number;

	@NotNull(message = "예약한 날짜는 Null 일 수 없다.")
	private LocalDate date;

	@NotNull(message = "예약한 시간은 Null 일 수 없다.")
	private LocalTime time;

	@NotNull(message = "예약에서 차 대수는 Null 일 수 없다.")
	@Max(value = 10)
	private int count;

	@NotNull(message = "예약에서 거리는 Null 일 수 없다.")
	private double distance;

	public Reservation(Customer customer, @Nullable Driver driver, String number, LocalDate date, LocalTime time,
		int count,
		double distance) {
		this.customer = customer;
		this.driver = driver;
		this.number = number;
		this.date = date;
		this.time = time;
		this.count = count;
		this.distance = distance;
	}
}
