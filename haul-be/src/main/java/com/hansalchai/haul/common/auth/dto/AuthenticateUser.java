package com.hansalchai.haul.common.auth.dto;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.user.entity.Users;

import lombok.Getter;

@Getter
public class AuthenticateUser {

	private Long userId;
	private Role role;

	public AuthenticateUser(Long userId, Role role) {
		this.userId = userId;
		this.role = role;
	}

	public AuthenticateUser(Users user) {
		this.userId = user.getUserId();
		this.role = user.getRole();
	}
}
