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
	private int sourceId;

	@OneToOne(fetch = FetchType.LAZY)
	private Reservation reservation;

	@NotNull(message = "출발지 이름은 Null 일 수 없다.")
	@Column(length = 100)
	private String name;

	@NotNull(message = "출발지 주소는 Null 일 수 없다.")
	@Column(length = 100)
	private String address;

	@NotNull(message = "출발지 세부주소는 Null 일 수 없다.")
	@Column(length = 100)
	private String detailAddress;

	//TODO : 음수테스트하기
	@NotNull(message = "출발지 위도는 Null 일 수 없다.")
	@Column(precision = 4, scale = 7)
	private BigDecimal latitude;

	@NotNull(message = "출발지 경도는 Null 일 수 없다.")
	@Column(precision = 4, scale = 7)
	private BigDecimal longitude;

	@NotNull(message = "출발지 전화번호는 Null 일 수 없다.")
	@Column(length = 15)
	private String tel;

	@Builder
	public Source(Reservation reservation, String name, String address, String detailAddress, BigDecimal latitude,
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
