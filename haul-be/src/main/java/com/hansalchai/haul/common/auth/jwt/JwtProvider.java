package com.hansalchai.haul.common.auth.jwt;

import static com.hansalchai.haul.common.utils.ErrorCode.*;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.hansalchai.haul.common.utils.ErrorCode;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtProvider {

	public static final String AUTHENTICATE_USER = "authenticateUser";
	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String BEARER_TOKEN_PREFIX = "Bearer ";

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

	// Request Header에서 token 값 가져옴
	public String resolveToken(HttpServletRequest request) {
		String header = request.getHeader(AUTHORIZATION_HEADER);
		return header.split(" ")[1];
	}

	public ErrorCode validateToken(String token) {
		try {
			getClaims(token);
			return null;
		} catch (MalformedJwtException | SignatureException | UnsupportedJwtException |
				 IllegalArgumentException exception) {
			exception.printStackTrace();
			return INVALID_TOKEN;
		} catch (ExpiredJwtException exception) {
			exception.printStackTrace();
			return EXPIRED_TOKEN;
		}
	}
}
