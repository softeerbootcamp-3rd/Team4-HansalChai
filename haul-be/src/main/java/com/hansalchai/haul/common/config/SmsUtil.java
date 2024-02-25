package com.hansalchai.haul.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SmsUtil {

	@Value("${coolsms.api.key}")
	private String apiKey;

	@Value("${coolsms.api.secret}")
	private String apiSecretKey;

	@Value("${coolsms.from}")
	private String from;

	private DefaultMessageService messageService;

	@PostConstruct
	private void init() {
		messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, "https://api.coolsms.co.kr");
	}

	// 단일 메시지 발송
	public SingleMessageSentResponse send(String to, String reservationNumber) {
		Message message = new Message();
		message.setFrom(from);
		message.setTo(to);
		message.setText("기사 배정이 완료되었습니다. 앱에서 확인해주세요\n" + "예약번호 : " + reservationNumber);

		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		log.info("sms 전송 내역 : {}", response);
		return response;
	}
}
