package com.elitebuy.configuration;

import java.io.IOException;
import java.util.List;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.crypto.SecretKey;

public class JwtValidator extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String jwt = request.getHeader(JwtConstant.JWT_HEADER);

		if(jwt!=null){
			// Bearere
			jwt = jwt.substring(7);
			try{

				SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

				Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
						.parseClaimsJws(jwt).getBody();

				String email = String.valueOf(claims.get("email"));

				String authorities = String.valueOf(claims.get("authorities"));

				List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

				Authentication authentication = new UsernamePasswordAuthenticationToken(email,null,auths);

				SecurityContextHolder.getContext().setAuthentication(authentication);


			}
			catch (Exception e){
				throw new BadCredentialsException("invalid tiken...... from jwt validator");
			}
		}
		filterChain.doFilter(request,response);
	}
	
	
}
