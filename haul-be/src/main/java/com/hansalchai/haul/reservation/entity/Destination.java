package com.hansalchai.haul.reservation.entity;

import java.math.BigDecimal;

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
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE destination SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "destination")
public class Destination extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int destinationId;

	@OneToOne(fetch = FetchType.LAZY)
	@Column(nullable = false)
	private Reservation reservation;

	@Column(length = 100, nullable = false)
	private String name;

	@Column(length = 100, nullable = false)
	private String address;

	@Column(length = 100, nullable = false)
	private String detailAddress;

	@Column(precision = 4, scale = 7, nullable = false)
	private BigDecimal latitude;

	@Column(precision = 4, scale = 7, nullable = false)
	private BigDecimal longitude;

	@Column(length = 15, nullable = false)
	private String tel;

	@Builder
	public Destination(Reservation reservation, String name, String address, String detailAddress, BigDecimal latitude,
		BigDecimal longitude, String tel) {
		this.reservation = reservation;
		this.name = name;
		this.address = address;
		this.detailAddress = detailAddress;
		this.latitude = latitude;
		this.longitude = longitude;
		this.tel = tel;
	}
}
