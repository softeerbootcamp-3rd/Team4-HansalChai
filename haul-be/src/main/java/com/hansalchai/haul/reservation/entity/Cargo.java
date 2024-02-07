package com.hansalchai.haul.reservation.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

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
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE cargo SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "cargo")
public class Cargo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cargoId;

	@OneToOne(fetch = FetchType.LAZY)
	private Reservation reservation;

	@NotNull(message = "화물 가로는 Null 일 수 없다.")
	@Max(value = 1000, message = "화물 가로는 10m를 넘을 수 없다.")
	private int width;

	@NotNull(message = "화물 세로는 Null 일 수 없다.")
	@Max(value = 1000, message = "화물 세로는 10m를 넘을 수 없다.")
	private int length;

	@NotNull(message = "화물 높이는 Null 일 수 없다.")
	@Max(value = 1000, message = "화물 높이는 10m를 넘을 수 없다.")
	private int height;

	@NotNull(message = "화물 무게는 Null 일 수 없다.")
	private int weight;
}
