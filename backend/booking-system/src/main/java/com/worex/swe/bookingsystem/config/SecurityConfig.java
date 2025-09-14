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
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // 🛠️ Admin APIs
                        .requestMatchers("admin/**").hasRole("ADMIN")

                        // 🔓 Auth APIs
                        .requestMatchers("/auth/register", "/auth/login").permitAll()
                        .requestMatchers("/auth/logout").authenticated()

                        // 👤 User APIs
                        .requestMatchers("/api/users/**").hasRole("USER")

                        // 🎟️ Booking APIs (only authenticated users)
                        .requestMatchers(HttpMethod.POST, "/api/bookings").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/bookings/**").hasRole("USER")

                        // 🎉 Event APIs
                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll() // anyone can view events
                        .requestMatchers(HttpMethod.POST, "/api/events").hasRole("ADMIN") // only admins create
                        .requestMatchers(HttpMethod.PUT, "/api/events/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/events/**").hasRole("ADMIN")

                        // swagger
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**",
                                "/swagger-ui.html", "/swagger-ui/index.html").permitAll()

                        // Any other request → authenticated
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
