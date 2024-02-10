package com.hansalchai.haul.customer.dto;

import com.hansalchai.haul.customer.entity.Customer;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CustomerSignUpDto {

	@NotNull(message = "이름은 null일 수 없습니다.")
	private String name;

	@NotNull(message = "이메일은 null일 수 없습니다.")
	private String email;

	@NotNull(message = "전화번호는 null일 수 없습니다.")
	private String tel;

	@NotNull(message = "비밀번호는 null일 수 없습니다.")
	private String password;

	public Customer toEntity() {
		return Customer.builder()
			.name(name)
			.email(email)
			.tel(tel)
			.password(password)
			.build();
	}
}
