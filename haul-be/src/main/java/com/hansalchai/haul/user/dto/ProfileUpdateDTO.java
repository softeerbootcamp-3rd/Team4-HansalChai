package com.hansalchai.haul.user.dto;

import com.hansalchai.haul.user.entity.Users;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateDTO {
	@NotNull(message = "이름은 null일 수 없습니다.")
	private final String name;
	@NotNull(message = "비밀번호는 null일 수 없습니다.")
	private final String email;
	@NotNull(message = "전화번호(아이디)는 null일 수 없습니다.")
	private final String password;

	public ProfileUpdateDTO(String name, String email, String password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
