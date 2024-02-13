package com.hansalchai.haul.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserLoginDto {

	@NotNull(message = "전화번호(아이디)는 null일 수 없습니다.")
	private String tel;

	@NotNull(message = "비밀번호는 null일 수 없습니다.")
	private String password;


	public UserLoginDto(String tel, String password) {
		this.tel = tel;
		this.password = password;
	}
}
