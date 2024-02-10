package com.hansalchai.haul.user.service;

import org.springframework.stereotype.Service;

import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UsersService {

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
}
