package com.hansalchai.haul.reservation;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.reservation.constants.TransportType;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.service.ReservationService;

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
	private MockMvc mvc;

	@BeforeEach
	public void setup(WebApplicationContext webApplicationContext) {
		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
			.addFilter(new CharacterEncodingFilter(StandardCharsets.UTF_8.name(), true))
			.build();
	}

	private ReservationRequest.CreateReservationDTO makeDummyReservationRequestDTO(){
		ReservationRequest.CreateReservationDTO.SourceDTO sourceDTO =
			ReservationRequest.CreateReservationDTO.SourceDTO.builder()
				.name("광주")
				.tel("01012345678")
				.address("광주광역시 서구 상무민주로 119 나나빌딩")
				.detailAddress("구이덕")
				.longitude(BigDecimal.valueOf(35.161723))
				.latitude(BigDecimal.valueOf(126.857084))
				.build();
		ReservationRequest.CreateReservationDTO.DestinationDTO destinationDTO =
			ReservationRequest.CreateReservationDTO.DestinationDTO.builder()
				.name("부산")
				.tel("01012345678")
				.address("부산광역시 연제구 거제대로178번길 51-2")
				.detailAddress("종갓집 양곱창")
				.longitude(BigDecimal.valueOf(35.184116))
				.latitude(BigDecimal.valueOf(129.073332))
				.build();
		//TODO 12000은 안됨
		ReservationRequest.CreateReservationDTO.CargoDTO cargoDTO =
			ReservationRequest.CreateReservationDTO.CargoDTO.builder()
				.width(100)
				.length(100)
				.height(100)
				.weight(6000)
				.build();
		ReservationRequest.CreateReservationDTO.CargoOptionDTO cargoOptionDTO =
			ReservationRequest.CreateReservationDTO.CargoOptionDTO.builder()
				.isRefrigerated(true)
				.isFurniture(false)
				.isLiftRequired(true)
				.isFrozen(false)
				.build();

		ReservationRequest.CreateReservationDTO createReservationDTO =
			ReservationRequest.CreateReservationDTO.builder()
				.date(LocalDate.parse("2024-02-14"))
				.time(LocalTime.parse("14:30:00"))
				.transportType(TransportType.GENERAL)
				.cargo(cargoDTO)
				.cargoOption(cargoOptionDTO)
				.src(sourceDTO)
				.dst(destinationDTO)
				.build();
		return createReservationDTO;
	}

	@Test
	@DisplayName("예약 service 테스트")
	void ReservationServiceTest() throws Exception {
		// given
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTO();
		//when
		ReservationResponse.ReservationRecommendationDTO reservationRecommendationDTO = reservationService.createReservation(createReservationDTO);
		//then
		logger.info(String.valueOf(reservationRecommendationDTO.getCost()));
		logger.info(String.valueOf(reservationRecommendationDTO.getDuration()));
		logger.info(String.valueOf(reservationRecommendationDTO.getCar().getCount()));
		logger.info(String.valueOf(reservationRecommendationDTO.getCar().getModel()));
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
				.contentType(MediaType.APPLICATION_JSON)
				.content(jsonContent)
		);

		// console
		String responseBody = resultActions.andReturn().getResponse().getContentAsString();
		logger.info("테스트 정보 확인: "+responseBody);

		// verify
		resultActions.andExpect(jsonPath("$.status").value("success"));
	}

}
