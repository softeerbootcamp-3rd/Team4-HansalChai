package com.hansalchai.haul.owner.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.utils.BaseTime;
import com.hansalchai.haul.driver.entity.Driver;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE owner SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Table(name = "owner")
public class Owner extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ownerId;

	@ManyToOne(fetch = FetchType.LAZY)
	private Car car;

	@ManyToOne(fetch = FetchType.LAZY)
	private Driver driver;

	@Column(nullable = false)
	private String number;
}
