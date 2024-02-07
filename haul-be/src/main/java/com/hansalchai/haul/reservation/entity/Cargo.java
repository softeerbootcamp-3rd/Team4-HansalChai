package com.hansalchai.haul.reservation.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.hansalchai.haul.common.utils.BaseTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE cargo SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "cargo")
public class Cargo extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cargoId;

	@OneToOne(fetch = FetchType.LAZY)
	private Reservation reservation;

	@Max(value = 1000, message = "화물 가로는 10m를 넘을 수 없다.")
	@Column(nullable = false)
	private int width;

	@Max(value = 1000, message = "화물 세로는 10m를 넘을 수 없다.")
	@Column(nullable = false)
	private int length;

	@Max(value = 1000, message = "화물 높이는 10m를 넘을 수 없다.")
	@Column(nullable = false)
	private int height;

	@Column(nullable = false)
	private int weight;

	@Builder
	public Cargo(Reservation reservation, int width, int length, int height, int weight) {
		this.reservation = reservation;
		this.width = width;
		this.length = length;
		this.height = height;
		this.weight = weight;
	}
}
