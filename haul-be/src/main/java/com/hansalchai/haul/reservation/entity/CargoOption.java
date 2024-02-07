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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE cargo_option SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "cargo_option")
public class CargoOption extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cargoOptionId;

	@OneToOne(fetch = FetchType.LAZY)
	private Reservation reservation;

	@Column(nullable = false)
	private boolean isRefrigerated;

	@Column(nullable = false)
	private boolean isFrozen;

	@Column(nullable = false)
	private boolean isFurniture;

	@Column(nullable = false)
	private boolean isLiftRequired;

	@Builder
	public CargoOption(Reservation reservation, boolean isRefrigerated, boolean isFrozen, boolean isFurniture,
		boolean isLiftRequired) {
		this.reservation = reservation;
		this.isRefrigerated = isRefrigerated;
		this.isFrozen = isFrozen;
		this.isFurniture = isFurniture;
		this.isLiftRequired = isLiftRequired;
	}
}
