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
import com.hansalchai.haul.user.dto.CustomerSignUpDto;

@SpringBootTest
@AutoConfigureMockMvc
class UsersControllerTest {

	@Autowired MockMvc mockMvc;
	@Autowired ObjectMapper objectMapper;

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
}
