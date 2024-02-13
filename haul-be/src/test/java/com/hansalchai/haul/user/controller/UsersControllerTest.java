package com.hansalchai.haul.user.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.user.dto.CustomerSignUpDto;
import com.hansalchai.haul.user.dto.UserLoginDto;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UsersControllerTest {

	@Autowired MockMvc mockMvc;
	@Autowired ObjectMapper objectMapper;

	@Autowired UsersRepository usersRepository;

	@Test
	@DisplayName("회원가입 테스트")
	void signUp() throws Exception {

		//given
		String content = objectMapper.writeValueAsString(
			new CustomerSignUpDto("haul", "01012341234", "password", "haul@gmail.com"));

		//when, then
		mockMvc.perform(post("/api/v1/users/sign-up")
				.content(content)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andDo(print());
	}

	@Test
	@DisplayName("로그인 테스트")
	void signIn() throws Exception {

		//given
		Users user = Users.builder()
			.name("haul")
			.tel("01012341234")
			.password("password")
			.email("haul@gmail.com")
			.role(Role.CUSTOMER)
			.build();
		usersRepository.save(user);

		//when, then
		String content = objectMapper.writeValueAsString(new UserLoginDto("01012341234", "password"));

		mockMvc.perform(post("/api/v1/users/sign-in")
				.content(content)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.data.accessToken").exists())
			.andExpect(jsonPath("$.data.refreshToken").exists())
			.andDo(print());
	}
}
