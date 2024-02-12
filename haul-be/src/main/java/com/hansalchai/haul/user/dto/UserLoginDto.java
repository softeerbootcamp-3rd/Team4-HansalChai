package com.hansalchai.haul.user.dto;

import lombok.Getter;

@Getter
public class UserLoginDto {

	private String tel;
	private String password;


	public UserLoginDto(String tel, String password) {
		this.tel = tel;
		this.password = password;
	}
}
