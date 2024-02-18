package com.hansalchai.haul.user.dto;

import com.hansalchai.haul.common.auth.jwt.Jwt;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserLogin {

	@Getter
	@NoArgsConstructor
	public static class RequestDto {

		@NotNull(message = "전화번호(아이디)는 null일 수 없습니다.")
		private String tel;

		@NotNull(message = "비밀번호는 null일 수 없습니다.")
		private String password;

		public RequestDto(String tel, String password) {
			this.tel = tel;
			this.password = password;
		}
	}

	@Getter
	public static class ResponseDto {

		private Jwt jwt;
		private String name;

		public ResponseDto(Jwt jwt, String name) {
			this.jwt = jwt;
			this.name = name;
		}
	}
}
