package com.hansalchai.haul.common.auth.dto;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.user.entity.Users;

import lombok.Getter;

@Getter
public class AuthenticatedUser {

	private Long userId;
	private Role role;

	public AuthenticatedUser(Users user) {
		this.userId = user.getUserId();
		this.role = user.getRole();
	}
}
