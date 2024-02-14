package com.hansalchai.haul.user.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.utils.BaseTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@SQLRestriction("is_deleted = FALSE")
@SQLDelete(sql = "UPDATE users SET deleted_at = CURRENT_TIMESTAMP, is_deleted = TRUE where id = ?")
@Entity
@Table(name = "users")
public class Users extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@Column(length = 30, nullable = false)
	private String name;

	@Column(length = 15, nullable = false)
	private String tel;

	@Column(length = 100, nullable = false)
	private String password;

	@Column(length = 50)
	private String email;

	private String photo;

	@Enumerated(EnumType.STRING)
	private Role role;

	private String refreshToken;

	@Builder
	public Users(String name, String tel, String password, String email, String photo, Role role) {
		this.name = name;
		this.tel = tel;
		this.password = password;
		this.email = email;
		this.photo = photo;
		this.role = role;
	}

	public void updateRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public void update(String password)
	{
		this.password = password;
	}

	public static Users toEntity(String name, String tel, String password, String email, String photo, Role role) {
		return Users.builder()
			.name(name)
			.tel(tel)
			.password(password)
			.email(email)
			.photo(photo)
			.role(role)
			.build();
	}

}
