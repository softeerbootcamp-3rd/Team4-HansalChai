package com.hansalchai.haul.reservation;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ReservationNumberGenerator;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.service.ReservationService;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;
import com.hansalchai.haul.user.service.UsersService;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

@SpringBootTest
@ActiveProfiles("test")
@Sql("classpath:db/teardown.sql")
public class ReservationTest {
	Logger logger = LoggerFactory.getLogger(ReservationTest.class);

	@Autowired
	private ObjectMapper om;

	@Autowired
	private ReservationService reservationService;
	@Autowired
	private UsersRepository usersRepository;
	private MockMvc mvc;

	@BeforeEach
	public void setup(WebApplicationContext webApplicationContext) {
		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
			.addFilter(new CharacterEncodingFilter(StandardCharsets.UTF_8.name(), true))
			.build();
	}

	@Test
	@DisplayName("예약 중복 테스트")
	void ReservationDuplicationTest() throws Exception{
		// given
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTO();

	}

	@Test
	@DisplayName("예약 service 테스트")
	void ReservationServiceTest() throws Exception {
		Users user = Users.builder()
			.name("haul")
			.tel("01012341234")
			.password("password")
			.email("haul@gmail.com")
			.role(Role.CUSTOMER)
			.build();
		Users saved = usersRepository.save(user);
		// given
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTO();
		//when
		ReservationResponse.ReservationRecommendationDTO actual = reservationService.createReservation(createReservationDTO,
			saved.getUserId());
		//then
		Assertions.assertEquals(1, actual.getCar().getCount());
		Assertions.assertEquals("포터2", actual.getCar().getModel());
	}

	@Test
	@DisplayName("고객은 화물차를 예약할 수 있습니다.")
	void ReservationMVCTest() throws Exception {
		// given
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTO();

		String jsonContent = om.writeValueAsString(createReservationDTO);
		logger.info(jsonContent);
		// when
		ResultActions resultActions = mvc.perform(
			post("/api/v1/reservations")
				.requestAttr(AUTHENTICATE_USER, new AuthenticatedUser(1L, Role.CUSTOMER))
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonContent)
		);

		// console
		String responseBody = resultActions.andReturn().getResponse().getContentAsString();
		logger.info("테스트 정보 확인: "+responseBody);

		// verify
		resultActions.andExpect(jsonPath("$.status").value(200));
	}

	@Test
	@DisplayName("비회원은 화물차를 예약할 수 있습니다.")
	void GuestReservationMVCTest() throws Exception {
		// given
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTO();

		String jsonContent = om.writeValueAsString(createReservationDTO);
		logger.info(jsonContent);
		// when
		ResultActions resultActions = mvc.perform(
			post("/api/v1/reservations/guest")
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonContent)
		);

		// console
		String responseBody = resultActions.andReturn().getResponse().getContentAsString();
		logger.info("테스트 정보 확인: "+responseBody);

		// verify
		resultActions.andExpect(jsonPath("$.status").value(200));
	}

	@Test
	@DisplayName("번호 생성테스트")
	void GenerateNumberTest() throws Exception {
		for(int i = 0;i<30;i++){
			logger.info(ReservationNumberGenerator.generateUniqueId());
		}
	}

	private ReservationRequest.CreateReservationDTO makeDummyReservationRequestDTO() {

		ReservationRequest.CreateReservationDTO.SourceDTO src = ReservationRequest.CreateReservationDTO.SourceDTO.builder()
			.name("나나빌딩")
			.address("광주광역시 서구 상무민주로 119 나나빌딩")
			.tel("01012345678")
			.detailAddress("3층")
			.latitude(37.4851943071576)
			.longitude(126.717952447459)
			.build();

		ReservationRequest.CreateReservationDTO.DestinationDTO dst = ReservationRequest.CreateReservationDTO.DestinationDTO.builder()
			.name("종갓집 양곱창")
			.address("부산광역시 연제구 거제대로178번길 51-2")
			.tel("01012345678")
			.detailAddress("1층")
			.latitude(37.4482284563797)
			.longitude(126.649653068211)
			.build();

		ReservationRequest.CreateReservationDTO.CargoDTO cargo = ReservationRequest.CreateReservationDTO.CargoDTO.builder()
			.width(1)
			.length(1)
			.height(1)
			.weight(1)
			.build();

		ReservationRequest.CreateReservationDTO.CargoOptionDTO cargoOption = ReservationRequest.CreateReservationDTO.CargoOptionDTO.builder()
			.isRefrigerated(true)
			.isFurniture(false)
			.isLiftRequired(false)
			.isFrozen(false)
			.build();

		return new ReservationRequest.CreateReservationDTO(
			"일반 용달",
			LocalDate.parse("2024-02-14"),
			LocalTime.parse("14:30:00"),
			src,
			dst,
			cargo,
			cargoOption
		);
	}
}
