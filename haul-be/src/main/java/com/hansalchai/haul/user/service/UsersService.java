package com.hansalchai.haul.user.service;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hansalchai.haul.common.auth.dto.AuthenticateUser;
import com.hansalchai.haul.common.auth.jwt.Jwt;
import com.hansalchai.haul.common.auth.jwt.JwtProvider;
import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.dto.UserLoginDto;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UsersService {

	private final JwtProvider jwtProvider;
	private final UsersRepository usersRepository;

	@Transactional
	public void signUp(CustomerSignUpDto signUpDto) {
		//중복 회원가입 검증
		String tel = signUpDto.getTel();
		if (usersRepository.findByTel(tel).isPresent()) {
			throw new IllegalArgumentException("이미 가입된 전화번호입니다.");
		}
		usersRepository.save(signUpDto.toEntity());
	}

	public Jwt signIn(UserLoginDto loginDto) {

		// db에 있는(회원가입한) 유저인지 검증
		Users user = usersRepository.findByTel(loginDto.getTel())
			.orElseThrow(() -> new IllegalArgumentException("회원가입하지 않은 유저입니다."));

		// 비밀번호 검증
		if (!loginDto.getPassword().equals(user.getPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}

		// claim 생성
		Map<String, Object> claims = new HashMap<>();
		AuthenticateUser authUser = new AuthenticateUser(user);
		claims.put(AUTHENTICATE_USER, authUser);

		// 토큰 생성
		Jwt jwt = jwtProvider.createJwt(claims);

		// refreshToken 저장
		user.updateRefreshToken(jwt.getRefreshToken());

		return jwt;
	}
}
