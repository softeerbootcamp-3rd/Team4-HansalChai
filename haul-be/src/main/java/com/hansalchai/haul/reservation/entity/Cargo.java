package com.hansalchai.haul.reservation.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.validator.constraints.Range;

import com.hansalchai.haul.common.utils.BaseTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
	private Long cargoId;

	@Range(min = 0, max = 1000, message = "화물 가로는 10m를 넘을 수 없다.")
	@Column(nullable = false)
	private int width;

	@Range(min = 0, max = 1000, message = "화물 세로는 10m를 넘을 수 없다.")
	@Column(nullable = false)
	private int length;

	@Range(min = 0, max = 1000, message = "화물 높이는 10m를 넘을 수 없다.")
	@Column(nullable = false)
	private int height;
	
	@Range(min = 0, max = 1000000, message = "화물 무게는 1000T를 넘을 수 없다.")
	@Column(nullable = false)
	private int weight;

	@Builder
	public Cargo(int width, int length, int height, int weight) {
		this.width = width;
		this.length = length;
		this.height = height;
		this.weight = weight;
	}
}
