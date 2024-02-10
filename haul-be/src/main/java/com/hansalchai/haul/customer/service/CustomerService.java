package com.hansalchai.haul.customer.service;

import org.springframework.stereotype.Service;

import com.hansalchai.haul.customer.dto.CustomerSignUpDto;
import com.hansalchai.haul.customer.repository.CustomerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {

	private final CustomerRepository customerRepository;

	@Transactional
	public void signUp(CustomerSignUpDto signUpDto) {
		//중복 회원가입 검증
		String tel = signUpDto.getTel();
		if (customerRepository.findByTel(tel).isPresent()) {
			throw new IllegalArgumentException("이미 가입된 전화번호입니다.");
		}
		customerRepository.save(signUpDto.toEntity());
	}
}
