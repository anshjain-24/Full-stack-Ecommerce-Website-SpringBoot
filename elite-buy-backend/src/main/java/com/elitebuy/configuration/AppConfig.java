package com.elitebuy.configuration;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class AppConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        // Cross-Origin Resource Sharing
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests(Authorize -> Authorize.requestMatchers("/api/**")
						.authenticated()
						.anyRequest()
						.permitAll()
				)
                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
                .csrf().disable()     // Cross-Site Request Forgery
                .cors().configurationSource(request -> {
                    // TODO Auto-generated method stub
                    CorsConfiguration cfg = new CorsConfiguration();
                    cfg.setAllowedOrigins(Arrays.asList(
                            "http://localhost:3000"
                    ));
                    cfg.setAllowedMethods(Collections.singletonList("*"));
                    cfg.setAllowCredentials(true);
                    cfg.setAllowedHeaders(Collections.singletonList("*"));
                    cfg.setExposedHeaders(Arrays.asList("Authorization"));
                    cfg.setMaxAge(3600L);

                    return cfg;
                })
                .and().httpBasic().and().formLogin();

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
