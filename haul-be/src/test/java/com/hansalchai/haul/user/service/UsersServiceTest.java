package com.hansalchai.haul.user.service;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;

@Transactional
@SpringBootTest
class UsersServiceTest {

	@Autowired UsersService usersService;
	@Autowired UsersRepository usersRepository;

	@Test
	@DisplayName("회원가입 성공")
	void signUpSuccessTest() {

		//given
		CustomerSignUpDto signUpDto
			= new CustomerSignUpDto("haul", "01012341234", "password", "haul@gmail.com");

		//when
		Long userId = usersService.signUp(signUpDto);

		//then
		Users user = usersRepository.findById(userId)
			.orElseThrow(IllegalArgumentException::new);

		assertThat(user.getName()).isEqualTo("haul");
		assertThat(user.getTel()).isEqualTo("01012341234");
		assertThat(user.getEmail()).isEqualTo("haul@gmail.com");
	}

	@Test
	@DisplayName("회원가입 실패 - 중복 전화번호 검증")
	void signUpFailTest() {

		//given
		CustomerSignUpDto signUpDto1
			= new CustomerSignUpDto("haul1", "01012341234", "password", "haul1@gmail.com");
		CustomerSignUpDto signUpDto2
			= new CustomerSignUpDto("haul2", "01012341234", "password", "haul2@gmail.com");

		//when, then
		usersService.signUp(signUpDto1); // 성공
		assertThatThrownBy(() -> usersService.signUp(signUpDto2)) //중복 전화번호로 가입 -> 예외 발생
			.isInstanceOf(IllegalArgumentException.class)
			.hasMessage("이미 가입된 전화번호입니다.");
	}
}