package com.hansalchai.haul.common.utils;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KakaoMap {
	private final ApiCommonAopAdvice apiCommonAopAdvice;

	@Autowired
	public KakaoMap(ApiCommonAopAdvice apiCommonAopAdvice) {
		this.apiCommonAopAdvice = apiCommonAopAdvice;
	}

	public void carPathFind(){
		String origin = "127.11015314141542,37.39472714688412";
		String destination = "127.10824367964793,37.401937080111644";
		String API_KEY = apiCommonAopAdvice.getApiKey();

		// 요청 보내기
		try {
			Map<String, String> params = new HashMap<>();
			params.put("origin", origin);
			params.put("destination", destination);
			params.put("waypoints", "");
			params.put("priority", "RECOMMEND");
			params.put("car_fuel", "GASOLINE");
			params.put("car_hipass", "false");
			params.put("alternatives", "false");
			params.put("road_details", "false");

			HttpResponse<String> response = sendGetRequest("https://apis-navi.kakaomobility.com/v1/directions", params, API_KEY);

			// 응답 출력
			System.out.println("Response code: " + response.statusCode());
			System.out.println("Response body: " + response.body());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public HttpResponse<String> sendGetRequest(String url, Map<String, String> params, String apiKey) throws Exception {
		// URL에 쿼리 파라미터 추가
		StringBuilder uriBuilder = new StringBuilder(url + "?");
		for (Map.Entry<String, String> entry : params.entrySet()) {
			uriBuilder.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
		}
		uriBuilder.deleteCharAt(uriBuilder.length() - 1);

		// HttpRequest 객체 생성
		HttpRequest request = HttpRequest.newBuilder()
			.uri(URI.create(uriBuilder.toString()))
			.header("Authorization", "KakaoAK " + apiKey)
			.build();

		// HttpClient 객체 생성
		HttpClient client = HttpClient.newHttpClient();

		// GET 요청 보내고 응답 받기
		return client.send(request, HttpResponse.BodyHandlers.ofString());
	}
}
