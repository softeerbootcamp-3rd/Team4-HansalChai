package com.hansalchai.haul.common.utils;

import org.springframework.stereotype.Component;

import com.hansalchai.haul.reservation.constants.TransportStatus;

import jakarta.persistence.AttributeConverter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class TransportStatusConverter implements AttributeConverter<TransportStatus, String> {
	@Override
	public String convertToDatabaseColumn(TransportStatus attribute) {
		return attribute.getCode();
	}

	@Override
	public TransportStatus convertToEntityAttribute(String dbData) {
		return TransportStatus.findOf(dbData);
	}
}
