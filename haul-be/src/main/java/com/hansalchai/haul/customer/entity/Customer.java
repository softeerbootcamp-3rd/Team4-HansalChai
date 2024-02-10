package com.hansalchai.haul.customer.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.hansalchai.haul.common.utils.BaseTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE customer SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Entity
@Table(name = "customer")
public class Customer extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long customerId;

	@Column(length = 30, nullable = false)
	private String name;

	@Column(length = 50, nullable = false)
	private String email;

	@Column(length = 15, nullable = false)
	private String tel;

	@Column(length = 100, nullable = false)
	private String password;

	@Builder
	public Customer(Long customerId, String name, String email, String tel, String password) {
		this.customerId = customerId;
		this.name = name;
		this.email = email;
		this.tel = tel;
		this.password = password;
	}
}
