package com.worex.swe.bookingsystem.controller;

import com.worex.swe.bookingsystem.dto.login.LoginRequestDTO;
import com.worex.swe.bookingsystem.dto.login.LoginResponseDTO;
import com.worex.swe.bookingsystem.dto.user.UserRequestDTO;
import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import com.worex.swe.bookingsystem.service.user_service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO response = userService.register(userRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO response = userService.login(loginRequestDTO);
        ResponseCookie jwtCookie = ResponseCookie.from("token", response.getToken())
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();
//        response.setToken(null);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        ResponseCookie jwtCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body("Logged out successfully");
    }
}
