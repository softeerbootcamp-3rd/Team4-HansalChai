package com.hansalchai.haul.reservation;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.car.constants.CarCategory;
import com.hansalchai.haul.car.constants.CarType;
import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.entity.Cargo;
import com.hansalchai.haul.reservation.service.ReservationService;
import com.hansalchai.haul.user.entity.Users;
import com.hansalchai.haul.user.repository.UsersRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class ReservationIntegrationTest {
	Logger logger = LoggerFactory.getLogger(ReservationIntegrationTest.class);

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
	@DisplayName("MVC - 고객은 화물차를 예약할 수 있습니다.")
	void reservationMVCTest() throws Exception {
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
		logger.info("테스트 정보 확인: " + responseBody);

		// verify
		resultActions.andExpect(jsonPath("$.status").value(200));
	}

	@Test
	@DisplayName("MVC - 비회원은 화물차를 예약할 수 있습니다.")
	void guestReservationMVCTest() throws Exception {
		// given
		ReservationRequest.CreateReservationGuestDTO createReservationDTO = makeDummyReservationRequestGuestDTO();

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
		logger.info("테스트 정보 확인: " + responseBody);

		// verify
		resultActions.andExpect(jsonPath("$.status").value(200));
	}

	@Test
	@DisplayName("회원은 화물을 예약할 수 있습니다.")
	void reservationServiceTest() throws Exception {
		Users users = Users.builder()
			.userId(1L)
			.photo(null)
			.email("asdf@gmail.com")
			.name("asdf")
			.password("12341234")
			.role(Role.CUSTOMER)
			.tel("01011112222")
			.build();
		Users savedUsers = usersRepository.save(users);
		// given
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTO();
		//when
		ReservationResponse.ReservationRecommendationDTO actual = reservationService.createReservation(
			createReservationDTO, savedUsers.getUserId());
		//then
		Assertions.assertEquals(1, actual.getCar().getCount());
		Assertions.assertEquals("포터2", actual.getCar().getModel());
	}

	@Test
	@DisplayName("예약 비회원 service 테스트")
	void reservationGuestServiceTest() throws Exception {
		// given
		ReservationRequest.CreateReservationGuestDTO createReservationDTO = makeDummyReservationRequestGuestDTO();
		//when
		ReservationResponse.ReservationRecommendationDTO actual = reservationService.createGuestReservation(
			createReservationDTO);
		//then
		Assertions.assertEquals(1, actual.getCar().getCount());
		Assertions.assertEquals("포터2", actual.getCar().getModel());
	}

	@Test
	@Transactional
	@DisplayName("회원은 최소 단위의 화물을 예약할 수 있습니다.")
	void reservationServiceWithMinimumCargoSizeTest() throws Exception {
		Users users = Users.builder()
			.userId(1L)
			.photo(null)
			.email("asdf@gmail.com")
			.name("asdf")
			.password("12341234")
			.role(Role.CUSTOMER)
			.tel("01011112222")
			.build();
		Users savedUsers = usersRepository.save(users);
		// 최소 크기 화물 설정
		Cargo cargo = Cargo.builder().width(1).height(1).length(1).weight(1).build();
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTOCargoSetting(
			cargo);
		//when
		ReservationResponse.ReservationRecommendationDTO actual = reservationService.createReservation(
			createReservationDTO, savedUsers.getUserId());

		Assertions.assertNotNull(actual);
	}

	@Test
	@Transactional
	@DisplayName("회원은 평균 단위의 화물을 예약할 수 있습니다.")
	void reservationServiceWithAverageCargoSizeTest() throws Exception {
		Users users = Users.builder()
			.userId(1L)
			.photo(null)
			.email("asdf@gmail.com")
			.name("asdf")
			.password("12341234")
			.role(Role.CUSTOMER)
			.tel("01011112222")
			.build();
		Users savedUsers = usersRepository.save(users);
		// 대략적인 평균 크기 화물 설정
		Cargo cargo = Cargo.builder().width(350).height(120).length(135).weight(2500).build();
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTOCargoSetting(
			cargo);
		//when
		ReservationResponse.ReservationRecommendationDTO actual = reservationService.createReservation(
			createReservationDTO, savedUsers.getUserId());

		Assertions.assertNotNull(actual);
	}

	@Test
	@Transactional
	@DisplayName("회원은 최대 크기 단위의 화물을 예약할 수 있습니다.")
	void reservationServiceWithMaximumCargoSizeTest() throws Exception {
		Users users = Users.builder()
			.userId(1L)
			.photo(null)
			.email("asdf@gmail.com")
			.name("asdf")
			.password("12341234")
			.role(Role.CUSTOMER)
			.tel("01011112222")
			.build();
		Users savedUsers = usersRepository.save(users);
		// 최대 크기 화물 설정
		Cargo cargo = Cargo.builder().width(700).length(240).height(270).weight(5000).build();
		ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTOCargoSetting(
			cargo);
		//when
		ReservationResponse.ReservationRecommendationDTO actual = reservationService.createReservation(
			createReservationDTO, savedUsers.getUserId());

		Assertions.assertNotNull(actual);
	}

	@Test
	@Transactional
	@DisplayName("예약 회원 다양한 짐의 크기의 화물을 예약할 수 있습니다.")
	void reservationServiceCargoTest() throws Exception {
		Users users = Users.builder()
			.userId(1L)
			.photo(null)
			.email("asdf@gmail.com")
			.name("asdf")
			.password("12341234")
			.role(Role.CUSTOMER)
			.tel("01011112222")
			.build();
		Users savedUsers = usersRepository.save(users);
		for (int i = 1; i <= 700; i += 11) {
			for (int j = 1; j <= 240; j += 11) {
				for (int k = 1; k <= 270; k += 11) {
					for (int l = 1; l <= 5000; l += 11) {
						Cargo cargo = Cargo.builder()
							.width(i)
							.length(j)
							.height(k)
							.weight(l)
							.build();
						// given
						ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTOCargoSetting(
							cargo);
						//when
						ReservationResponse.ReservationRecommendationDTO actual = reservationService.createReservation(
							createReservationDTO, savedUsers.getUserId());

						Assertions.assertNotNull(actual);
					}
				}
			}
		}
	}

	@Test
	@Transactional
	@DisplayName("회원은 예약한 화물을 확인할 수 있습니다.")
	void getReservationServiceTest() throws Exception {
		//given
		Users users = Users.builder()
			.userId(1L)
			.photo(null)
			.email("asdf@gmail.com")
			.name("asdf")
			.password("12341234")
			.role(Role.CUSTOMER)
			.tel("01011112222")
			.build();
		Users savedUsers = usersRepository.save(users);
		int saveNum = 14;
		for (int i = 0; i < saveNum; i++) {
			ReservationRequest.CreateReservationDTO createReservationDTO = makeDummyReservationRequestDTO();
			ReservationResponse.ReservationRecommendationDTO reservationRecommendationDTO = reservationService.createReservation(
				createReservationDTO, savedUsers.getUserId());
			reservationService.patchReservation(reservationRecommendationDTO.getReservationId(),
				savedUsers.getUserId());
		}
		List<String> keywords = Arrays.asList("매칭 중", "운송 전", "운송 중", "운송 완료");
		int page = 0;

		ReservationResponse.ReservationDTO reservationDTO = reservationService.getReservation(keywords.get(0), page,
			savedUsers.getUserId());

		Assertions.assertFalse(reservationDTO.isLastPage());

		page = 1;
		reservationDTO = reservationService.getReservation(keywords.get(0), page,
			savedUsers.getUserId());

		Assertions.assertTrue(reservationDTO.isLastPage());
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

	private ReservationRequest.CreateReservationGuestDTO makeDummyReservationRequestGuestDTO() {

		ReservationRequest.CreateReservationGuestDTO.SourceDTO src = ReservationRequest.CreateReservationGuestDTO.SourceDTO.builder()
			.name("나나빌딩")
			.address("광주광역시 서구 상무민주로 119 나나빌딩")
			.tel("01012345678")
			.detailAddress("3층")
			.latitude(37.4851943071576)
			.longitude(126.717952447459)
			.build();

		ReservationRequest.CreateReservationGuestDTO.DestinationDTO dst = ReservationRequest.CreateReservationGuestDTO.DestinationDTO.builder()
			.name("종갓집 양곱창")
			.address("부산광역시 연제구 거제대로178번길 51-2")
			.tel("01012345678")
			.detailAddress("1층")
			.latitude(37.4482284563797)
			.longitude(126.649653068211)
			.build();

		ReservationRequest.CreateReservationGuestDTO.CargoDTO cargo = ReservationRequest.CreateReservationGuestDTO.CargoDTO.builder()
			.width(1)
			.length(1)
			.height(1)
			.weight(1)
			.build();

		ReservationRequest.CreateReservationGuestDTO.CargoOptionDTO cargoOption = ReservationRequest.CreateReservationGuestDTO.CargoOptionDTO.builder()
			.isRefrigerated(true)
			.isFurniture(false)
			.isLiftRequired(false)
			.isFrozen(false)
			.build();

		ReservationRequest.CreateReservationGuestDTO.UserInfoDTO userInfoDTO = ReservationRequest.CreateReservationGuestDTO.UserInfoDTO.builder()
			.name("철수")
			.tel("01012344321")
			.build();

		return new ReservationRequest.CreateReservationGuestDTO(
			"일반 용달",
			LocalDate.parse("2024-02-14"),
			LocalTime.parse("14:30:00"),
			src,
			dst,
			cargo,
			cargoOption,
			userInfoDTO
		);
	}

	private ReservationRequest.CreateReservationDTO makeDummyReservationRequestDTOCargoSetting(Cargo cargoInput) {

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
			.width(cargoInput.getWidth())
			.length(cargoInput.getLength())
			.height(cargoInput.getHeight())
			.weight(cargoInput.getHeight())
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

	public List<Car> carMaker() {
		List<Car> cars = new ArrayList<>();

		cars.add(new Car(CarType.TRUCK500, "뉴다마스", null, 175, 126, 126, 500, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 280, 160, 30, 1000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 300, 160, 140, 1000, CarCategory.DEFAULT, true));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 270, 160, 150, 1000, CarCategory.IS_REFRIGERABLE, true));
		cars.add(new Car(CarType.TRUCK1000, "포터2", null, 280, 160, 150, 1000, CarCategory.IS_FREEZABLE, true));
		cars.add(new Car(CarType.TRUCK5000, "메가트럭", null, 460, 230, 40, 5000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 180, 40, 8000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 190, 190, 8000, CarCategory.DEFAULT, true));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 180, 180, 8000, CarCategory.IS_REFRIGERABLE, true));
		cars.add(new Car(CarType.TRUCK8000, "마이티", null, 430, 190, 190, 8000, CarCategory.IS_FREEZABLE, true));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.DEFAULT, false));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.DEFAULT, true));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.IS_REFRIGERABLE, true));
		cars.add(new Car(CarType.TRUCK15000, "파비스", null, 700, 240, 270, 15000, CarCategory.IS_FREEZABLE, true));

		return cars;
	}
}
