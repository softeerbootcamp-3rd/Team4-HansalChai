package com.hansalchai.haul.car.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.common.utils.BaseTime;
import com.hansalchai.haul.reservation.entity.Reservation;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE car SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "car")
public class Car extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int carId;

	@Column(nullable = false)
	private String type;

	@Column(nullable = false)
	private String model;

	@Nullable
	private String photo;

	@Max(value = 10000, message = "자동차 가로는 100m를 넘을 수 없다.")
	@Column(nullable = false)
	private int width;

	@Max(value = 10000, message = "자동차 세로는 100m를 넘을 수 없다.")
	@Column(nullable = false)
	private int length;

	@Max(value = 10000, message = "자동차 높이는 100m를 넘을 수 없다.")
	@Column(nullable = false)
	private int height;

	@Column(nullable = false)
	private int weight;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CarCategory category;

	public Car(String type, String model, @Nullable String photo, int width, int length, int height, int weight,
		CarCategory category) {
		this.type = type;
		this.model = model;
		this.photo = photo;
		this.width = width;
		this.length = length;
		this.height = height;
		this.weight = weight;
		this.category = category;
	}
}
