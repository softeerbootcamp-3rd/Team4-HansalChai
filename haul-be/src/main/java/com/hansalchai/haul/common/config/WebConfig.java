package com.hansalchai.haul.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://43.201.240.238:5174", "http://43.201.240.238:5173", "https://haul.pages.dev",
				"http://localhost:5173", "http://localhost:4173", "http://localhost:5174"
				, "http://hyundai-haul.com/", "http://driver.hyundai-haul.com/", "https://hyundai-haul.com/",
				"https://driver.hyundai-haul.com/")
			.allowedMethods("*")
			.allowedHeaders("*")
			.exposedHeaders("*");
	}
}