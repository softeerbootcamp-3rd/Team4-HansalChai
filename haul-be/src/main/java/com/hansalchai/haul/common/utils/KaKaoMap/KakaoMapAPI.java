package com.hansalchai.haul.common.utils.KaKaoMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.utils.ApiCommonAopAdvice;
import com.hansalchai.haul.common.utils.Location;

@Component
public class KakaoMapAPI {
	private final ApiCommonAopAdvice apiCommonAopAdvice;
	private  static  final Logger logger = LoggerFactory.getLogger(KakaoMapAPI.class);

	@Autowired
	public KakaoMapAPI(ApiCommonAopAdvice apiCommonAopAdvice) {
		this.apiCommonAopAdvice = apiCommonAopAdvice;
	}

	public void KaKaoCarDirections(Location src, Location dst){
		String source = src.toString();
		String destination = dst.toString();
		String apiKey = apiCommonAopAdvice.getApiKey();
		String url = "https://apis-navi.kakaomobility.com/v1/directions";

		String params = "origin=" + source +
			"&destination=" + destination +
			"&waypoints=" +
			"&priority=RECOMMEND" +
			"&car_fuel=GASOLINE" +
			"&car_hipass=false" +
			"&alternatives=false" +
			"&road_details=false";

		String fullUrl = url + "?" + params;

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "KakaoAK " + apiKey);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(fullUrl, HttpMethod.GET, entity, String.class);

		if (response.getStatusCode() == HttpStatus.OK) {
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				JsonNode rootNode = objectMapper.readTree(response.getBody());

				JsonNode routesNode = rootNode.get("routes");
				JsonNode routeNode = routesNode.get(0); // 첫 번째 루트 선택
				JsonNode summaryNode = routeNode.get("summary");

				int distance = summaryNode.get("distance").asInt();
				int duration = summaryNode.get("duration").asInt();

				System.out.println("Distance: " + distance);
				System.out.println("Duration: " + duration);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			System.out.println("Failed to fetch data from Kakao API");
		}
	}

	public class RouteSummary {
		private Summary summary;

		public Summary getSummary() {
			return summary;
		}

		public void setSummary(Summary summary) {
			this.summary = summary;
		}
	}

	public class Summary {
		private int distance;
		private int duration;

		public int getDistance() {
			return distance;
		}

		public void setDistance(int distance) {
			this.distance = distance;
		}

		public int getDuration() {
			return duration;
		}

		public void setDuration(int duration) {
			this.duration = duration;
		}
	}
}
