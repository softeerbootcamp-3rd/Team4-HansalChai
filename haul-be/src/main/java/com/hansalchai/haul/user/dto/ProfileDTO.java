package com.hansalchai.haul.user.dto;

import com.hansalchai.haul.user.entity.Users;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ProfileDTO {
	@NotNull(message = "이름은 null일 수 없습니다.")
	private final String name;
	@NotNull(message = "비밀번호는 null일 수 없습니다.")
	private final String email;
	@NotNull(message = "전화번호(아이디)는 null일 수 없습니다.")
	private final String tel;

	@Builder
	public ProfileDTO(Users user){
		this.name = user.getName();
		this.email = user.getEmail();
		this.tel = user.getTel();
	}
}
