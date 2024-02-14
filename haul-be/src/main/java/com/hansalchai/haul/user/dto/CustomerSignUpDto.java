package com.hansalchai.haul.user.dto;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.user.entity.Users;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CustomerSignUpDto {

	@NotNull(message = "이름은 null일 수 없습니다.")
	private String name;

	@NotNull(message = "전화번호는 null일 수 없습니다.")
	private String tel;

	@NotNull(message = "비밀번호는 null일 수 없습니다.")
	private String password;

	@NotNull(message = "이메일은 null일 수 없습니다.")
	private String email;

	public CustomerSignUpDto(String name, String tel, String password, String email) {
		this.name = name;
		this.tel = tel;
		this.password = password;
		this.email = email;
	}

	public Users toEntity() {
		return Users.builder()
			.name(name)
			.tel(tel)
			.password(password)
			.email(email)
			.role(Role.CUSTOMER)
			.build();
	}
}
