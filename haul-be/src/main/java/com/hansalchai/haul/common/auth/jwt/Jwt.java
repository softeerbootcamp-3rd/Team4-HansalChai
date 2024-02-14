package com.hansalchai.haul.common.auth.jwt;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Jwt {

	private String accessToken;
	private String refreshToken;

	@Builder
	public Jwt(String accessToken, String refreshToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}
