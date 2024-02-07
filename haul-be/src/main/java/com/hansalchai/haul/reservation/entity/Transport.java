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
@SQLDelete(sql = "UPDATE transport SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "transport")
public class Transport extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int transportId;

	@OneToOne(fetch = FetchType.LAZY)
	private Reservation reservation;

	@NotNull(message = "운송종류는 null일 수 없다.")
	@Column(length = 10)
	private String type;

	@NotNull(message = "운송비용은 null일 수 없다.")
	private int fee;

	@NotNull(message = "운송이동시간은 null일 수 없다.")
	private int requiredTime;

	@NotNull(message = "운송상태는 null일 수 없다.")
	@Column(length = 10)
	private String status;
}

