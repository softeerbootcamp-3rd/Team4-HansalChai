package com.hansalchai.haul.user.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hansalchai.haul.common.auth.jwt.Jwt;
import com.hansalchai.haul.common.auth.service.AuthService;
import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.dto.ProfileDTO;
import com.hansalchai.haul.user.dto.ProfileUpdateDTO;
import com.hansalchai.haul.user.dto.UserLoginDto;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UsersService {

	private final AuthService authService;
	private final UsersRepository usersRepository;

	@Transactional
	public Long signUp(CustomerSignUpDto signUpDto) {
		//중복 회원가입 검증
		String tel = signUpDto.getTel();
		if (usersRepository.findByTel(tel).isPresent()) {
			throw new IllegalArgumentException("이미 가입된 전화번호입니다.");
		}

		return usersRepository.save(signUpDto.toEntity()).getUserId();
	}

	@Transactional
	public Jwt signIn(UserLoginDto loginDto) throws JsonProcessingException {

		// db에 있는(회원가입한) 유저인지 검증
		Users user = usersRepository.findByTel(loginDto.getTel())
			.orElseThrow(() -> new IllegalArgumentException("회원가입하지 않은 유저입니다."));

		// 비밀번호 검증
		if (!loginDto.getPassword().equals(user.getPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}

		// 토큰 생성
		Jwt jwt = authService.createJwt(user);

		// refreshToken 저장
		user.updateRefreshToken(jwt.getRefreshToken());

		return jwt;
	}

	public ProfileDTO getProfile(Long userId) {
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("User not found"));
		return new ProfileDTO(user);
	}

	public void putProfile(ProfileUpdateDTO profileUpdateDTO, Long userId) {

	}
}
