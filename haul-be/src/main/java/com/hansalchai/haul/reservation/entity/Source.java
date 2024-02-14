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
@SQLDelete(sql = "UPDATE source SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "source")
public class Source extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sourceId;

	@Column(length = 100, nullable = false)
	private String name;

	@Column(length = 100, nullable = false)
	private String address;

	@Column(length = 100, nullable = false)
	private String detailAddress;

	@Column(nullable = false)
	private double latitude;

	@Column(nullable = false)
	private double longitude;

	@Column(length = 15, nullable = false)
	private String tel;

	@Builder
	public Source(String name, String address, String detailAddress, double latitude,
		double longitude, String tel) {
		this.name = name;
		this.address = address;
		this.detailAddress = detailAddress;
		this.latitude = latitude;
		this.longitude = longitude;
		this.tel = tel;
	}
}
