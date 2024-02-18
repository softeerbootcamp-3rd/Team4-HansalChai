package com.hansalchai.haul.order.dto;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hansalchai.haul.reservation.entity.Reservation;

@ExtendWith(MockitoExtension.class)
class TransportStatusChangeTest {

	@Mock Reservation mockReservation;

	@Test
	@DisplayName("TransportStatusChange.ResponseDto 생성자를 통한 객체 생성 테스트")
	void ResponseDtoTest() {

		//given
		when(mockReservation.getReservationId()).thenReturn(1L);

		//when
		TransportStatusChange.ResponseDto responseDto = new TransportStatusChange.ResponseDto(mockReservation);

		//then
		assertThat(responseDto.getId()).isEqualTo(1L);
	}
}
