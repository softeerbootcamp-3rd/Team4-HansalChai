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
import lombok.Getter;

@Getter
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE reservation SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "reservation")
public class Source extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int source_id;

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
	private String detail_address;

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
}
