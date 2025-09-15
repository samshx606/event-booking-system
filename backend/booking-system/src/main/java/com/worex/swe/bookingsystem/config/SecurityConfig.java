package com.worex.swe.bookingsystem.config;

import com.worex.swe.bookingsystem.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // User APIs
                        .requestMatchers("/api/users/me").hasRole("USER")
                        .requestMatchers("/api/users/**").hasRole("ADMIN")

                        // Admin APIs
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // Auth APIs
                        .requestMatchers(HttpMethod.POST, "/api//auth/logout").authenticated()
                        .requestMatchers("/api/auth/*").permitAll()

                        // Event APIs
                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
                        .requestMatchers("/api/events/**").hasRole("ADMIN")

                        // Booking APIs (only authenticated users)
                        .requestMatchers("/api/bookings/**").hasRole("USER")

                        // swagger
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**",
                                "/swagger-ui.html", "/swagger-ui/index.html").permitAll()

                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
