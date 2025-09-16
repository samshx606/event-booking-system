package com.worex.swe.bookingsystem.service.user_service;

import com.worex.swe.bookingsystem.dto.login.LoginRequestDTO;
import com.worex.swe.bookingsystem.dto.login.LoginResponseDTO;
import com.worex.swe.bookingsystem.dto.user.UserRequestDTO;
import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    Page<UserResponseDTO> getAllUsers(Pageable pageable);
    void deleteUser(Long id);
    void deleteProfile(String username);
    UserResponseDTO register(UserRequestDTO userRequestDTO);
    LoginResponseDTO login(LoginRequestDTO loginRequestDTO);
    UserResponseDTO viewProfile(UserDetails userDetails);
    UserResponseDTO makeAdmin(Long id);
}
