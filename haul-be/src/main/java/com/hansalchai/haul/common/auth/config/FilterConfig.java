package com.hansalchai.haul.common.auth.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.auth.filter.JwtValidationFilter;
import com.hansalchai.haul.common.auth.jwt.JwtProvider;

import jakarta.servlet.Filter;

@Configuration
public class FilterConfig {

	@Bean
	public FilterRegistrationBean<Filter> jwtValidationFilter(JwtProvider jwtProvider, ObjectMapper objectMapper) {
		FilterRegistrationBean<Filter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
		filterFilterRegistrationBean.setFilter(new JwtValidationFilter(jwtProvider, objectMapper));
		filterFilterRegistrationBean.setOrder(1);
		return filterFilterRegistrationBean;
	}
}
