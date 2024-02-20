package com.hansalchai.haul.common.utils.KaKaoMap;

import static com.hansalchai.haul.common.utils.ErrorCode.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hansalchai.haul.common.exceptions.InternalServerError;
import com.hansalchai.haul.common.utils.MapUtils.Location;
import com.hansalchai.haul.common.utils.MapUtils.DistanceDurationInfo;

@Component
public class KakaoMapAPI {
	private  static  final Logger logger = LoggerFactory.getLogger(KakaoMapAPI.class);

	@Value("${kakao.maps.apikey}")
	private String apiKey;

	public DistanceDurationInfo KaKaoCarDirections(Location src, Location dst){
		String source = src.toString();
		String destination = dst.toString();
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

				return new DistanceDurationInfo(distance, duration);
			} catch (Exception e) {
				throw new InternalServerError(KAKAO_MAP_ERROR);
			}
		} else {
			throw new InternalServerError(KAKAO_MAP_ERROR);
		}
	}

	public String searchRoadAddress(double latitude, double longitude) {
		String apiUrl = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";
		String queryString = String.format("x=%f&y=%f",latitude ,longitude );
		String fullUrl = apiUrl + "?" + queryString;

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "KakaoAK " + apiKey);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		// RestTemplate을 사용하여 API 호출
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(fullUrl, HttpMethod.GET, entity, String.class);

		// API 응답 확인
		if (response.getStatusCode() == HttpStatus.OK) {
			String responseBody = response.getBody();

			try {
				// JSON 파싱
				ObjectMapper objectMapper = new ObjectMapper();
				JsonNode rootNode = objectMapper.readTree(responseBody);
				JsonNode documents = rootNode.path("documents");
				if (documents.isArray() && documents.size() > 0) {
					// 첫 번째 문서에서 region_1depth_name 추출
					JsonNode firstDocument = documents.get(0);
					String region1DepthName = firstDocument.path("region_1depth_name").asText();
					return region1DepthName;
				} else {
					throw new InternalServerError(KAKAO_MAP_ERROR);
				}
			} catch (Exception e) {
				throw  new InternalServerError(KAKAO_MAP_ERROR);
			}
		} else {
			throw new InternalServerError(KAKAO_MAP_ERROR);
		}
	}
}
