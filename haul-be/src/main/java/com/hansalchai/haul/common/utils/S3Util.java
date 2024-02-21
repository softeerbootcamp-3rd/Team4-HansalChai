package com.hansalchai.haul.common.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.services.s3.AmazonS3;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class S3Util {

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public String getImage(String fileName) {
		return amazonS3.getUrl(bucket, fileName).toString();
	}
}
