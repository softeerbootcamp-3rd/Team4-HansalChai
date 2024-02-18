package com.hansalchai.haul.user.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.jwt.Jwt;
import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.dto.UserLogin;
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

	@Test
	@DisplayName("로그인 성공")
	void signInSuccessTest() {

		//given
		Users user = Users.builder()
			.name("haul")
			.tel("01012341234")
			.password("password")
			.email("haul@gmail.com")
			.role(Role.CUSTOMER)
			.build();
		usersRepository.save(user);

		//when
		UserLogin.RequestDto requestDto = new UserLogin.RequestDto("01012341234", "password");

		//then
		UserLogin.ResponseDto responseDto
			= assertDoesNotThrow(() -> usersService.signIn(requestDto));// 로그인 성공 시, 어떤 예외도 발생하지 않는다
		assertThat(responseDto.getJwt()).isInstanceOf(Jwt.class);
	}

	@Test
	@DisplayName("로그인 실패 - 회원가입하지 않은 유저의 로그인 시도")
	void signInFailTest1() {

		//given
		UserLogin.RequestDto requestDto = new UserLogin.RequestDto("01012341234", "password");

		//when, then
		assertThatThrownBy(() -> usersService.signIn(requestDto))
			.isInstanceOf(IllegalArgumentException.class)
			.hasMessage("회원가입하지 않은 유저입니다.");
	}

	@Test
	@DisplayName("로그인 실패 - 비밀번호가 틀린 경우")
	void signInFailTest2() {

		//given
		Users user = Users.builder()
			.name("haul")
			.tel("01012341234")
			.password("password")
			.email("haul@gmail.com")
			.role(Role.CUSTOMER)
			.build();
		usersRepository.save(user);

		UserLogin.RequestDto requestDto = new UserLogin.RequestDto("01012341234", "wrongPassword");

		//when, then
		assertThatThrownBy(() -> usersService.signIn(requestDto))
			.isInstanceOf(IllegalArgumentException.class)
			.hasMessage("비밀번호가 일치하지 않습니다.");
	}
}
