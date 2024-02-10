package com.hansalchai.haul.common.auth.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

	public static final String AUTHENTICATE_USER = "authenticateUser";

	private final Key key;

	@Value("${jwt.access-token.expire-length}")
	private long accessTokenExpireLengthInSeconds;

	@Value("${jwt.refresh-token.expire-length}")
	private long refreshTokenExpireLengthInSeconds;

	public JwtProvider(
		@Value("${jwt.secret}") String secret) {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public Jwt createJwt(Map<String, Object> claims) {
		String accessToken = createToken(claims, getExpireDateAccessToken());
		String refreshToken = createToken(new HashMap<>(), getExpireDateRefreshToken());
		return Jwt.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}

	public String createToken(Map<String, Object> claims, Date expireDate) {
		return Jwts.builder()
			.setClaims(claims)
			.setExpiration(expireDate)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public Claims getClaims(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token)
			.getBody();
	}

	public Date getExpireDateAccessToken() {
		long expireTimeMils = 1000L * accessTokenExpireLengthInSeconds;
		return new Date(System.currentTimeMillis() + expireTimeMils);
	}

	public Date getExpireDateRefreshToken() {
		long expireTimeMils = 1000L * refreshTokenExpireLengthInSeconds;
		return new Date(System.currentTimeMillis() + expireTimeMils);
	}
}
