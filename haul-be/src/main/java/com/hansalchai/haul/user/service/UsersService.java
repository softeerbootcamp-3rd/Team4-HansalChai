package com.hansalchai.haul.user.service;

import static com.hansalchai.haul.common.utils.ErrorCode.*;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hansalchai.haul.common.auth.jwt.Jwt;
import com.hansalchai.haul.common.auth.service.AuthService;
import com.hansalchai.haul.common.exceptions.ConflictException;
import com.hansalchai.haul.common.exceptions.UnauthorizedException;
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
			throw new ConflictException(ACCOUNT_ALREADY_EXISTS);
		}

		return usersRepository.save(signUpDto.toEntity()).getUserId();
	}

	@Transactional
	public Jwt signIn(UserLoginDto loginDto) throws JsonProcessingException {

		// db에 있는(회원가입한) 유저인지 검증
		Users user = usersRepository.findByTel(loginDto.getTel())
			.orElseThrow(() -> new UnauthorizedException(UNREGISTERED_USER_ID));

		// 비밀번호 검증
		if (!loginDto.getPassword().equals(user.getPassword())) {
			throw new UnauthorizedException(INCORRECT_PASSWORD);
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
		Users user = usersRepository.findById(userId)
			.orElseThrow(() -> new RuntimeException("User not found"));
		user.update(profileUpdateDTO.getPassword());
	}
}
