package com.hansalchai.haul.user.dto;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.user.entity.Users;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CustomerSignUpDto {

	private static final String TEL_REGEX = "^(01[016789]|02|\\d{2,3})-?(\\d{3,4})-?(\\d{4})$";
	private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$";

	@NotBlank(message = "이름은 null이나 공백일 수 없습니다.")
	private String name;

	@NotNull(message = "전화번호는 null일 수 없습니다.")
	@Pattern(regexp = TEL_REGEX)
	private String tel;

	@NotBlank(message = "비밀번호는 공백일 수 없습니다.")
	private String password;

	@NotNull(message = "이메일은 null일 수 없습니다.")
	@Pattern(regexp = EMAIL_REGEX)
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
