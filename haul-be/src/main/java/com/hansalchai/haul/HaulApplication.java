package com.hansalchai.haul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HaulApplication {

	public static void main(String[] args) {
		SpringApplication.run(HaulApplication.class, args);
	}

}
