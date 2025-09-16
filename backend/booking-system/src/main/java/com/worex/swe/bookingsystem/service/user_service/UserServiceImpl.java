package com.worex.swe.bookingsystem.service.user_service;

import com.worex.swe.bookingsystem.dto.login.LoginRequestDTO;
import com.worex.swe.bookingsystem.dto.login.LoginResponseDTO;
import com.worex.swe.bookingsystem.dto.user.UserRequestDTO;
import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import com.worex.swe.bookingsystem.enums.Role;
import com.worex.swe.bookingsystem.exception.ResourceNotFoundException;
import com.worex.swe.bookingsystem.exception.UnauthorizedException;
import com.worex.swe.bookingsystem.mapper.UserMapper;
import com.worex.swe.bookingsystem.model.User;
import com.worex.swe.bookingsystem.repository.UserRepository;
import com.worex.swe.bookingsystem.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Page<UserResponseDTO> getAllUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(userMapper::toResponseDTO);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
    @Override
    @Transactional
    public void deleteProfile(String username) {
        if (!userRepository.existsByUsername(username)) {
            throw new ResourceNotFoundException("User not found with username: " + username);
        }
        userRepository.deleteByUsername(username);
    }

    @Override
    @Transactional
    public UserResponseDTO register(UserRequestDTO userRequestDTO) {
        User user = userMapper.toUser(userRequestDTO);
        user.setPasswordHash(passwordEncoder.encode(userRequestDTO.getPassword()));
        user.setRole(Role.USER);
        User savedUser = userRepository.save(user);
        return userMapper.toResponseDTO(savedUser);
    }
    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO){
        User user = userRepository.findByUsername(loginRequestDTO.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Invalid username or password"));
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid username or password");
        }
        String token = jwtTokenProvider.generateToken(user);
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setId(user.getId());
        loginResponseDTO.setUsername(user.getUsername());
        loginResponseDTO.setEmail(user.getEmail());
        loginResponseDTO.setFirstName(user.getFirstName());
        loginResponseDTO.setLastName(user.getLastName());
        loginResponseDTO.setRole(user.getRole().toString());
        loginResponseDTO.setToken(token);
        return loginResponseDTO;
    }
    @Override
    public UserResponseDTO viewProfile(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(
                ()-> new ResourceNotFoundException("User not found with username: " + userDetails.getUsername()));
        return userMapper.toResponseDTO(user);
    }
    public UserResponseDTO makeAdmin(String username){
        User user = userRepository.findByUsername(username).orElseThrow(
                ()-> new ResourceNotFoundException("User not found with username: " + username));
        user.setRole(Role.ADMIN);
        User updatedUser = userRepository.save(user);
        return userMapper.toResponseDTO(updatedUser);
    }

}