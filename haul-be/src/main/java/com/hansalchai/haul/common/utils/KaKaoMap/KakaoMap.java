package com.hansalchai.haul.common.utils.KaKaoMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hansalchai.haul.common.utils.MapUtils.Location;
import com.hansalchai.haul.common.utils.MapUtils.DistanceDurationInfo;

@Component
public class KakaoMap {
	private final KakaoMapAPI kakaoMapAPI;

	@Autowired
	public KakaoMap(KakaoMapAPI kakaoMapAPI) {
		this.kakaoMapAPI = kakaoMapAPI;
	}
	/*
	Name     |  Type |  Description        |  Required
	distance	Int	   전체 검색 결과 거리(미터)	   필수
	duration	Int	   목적지까지 소요 시간(초)	   필수
	 */
	public DistanceDurationInfo carPathFind(Location src, Location dst) {
		return kakaoMapAPI.KaKaoCarDirections(src, dst);
	}
}
