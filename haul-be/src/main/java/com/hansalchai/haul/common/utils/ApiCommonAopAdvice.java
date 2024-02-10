package com.hansalchai.haul.common.utils;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
@Getter
public class ApiCommonAopAdvice {
	@Value("${kakao.maps.apikey}")
	private String apiKey;

	private String API_KEY;

	@PostConstruct
	private void initialize() {
		this.API_KEY = apiKey;
	}
}
