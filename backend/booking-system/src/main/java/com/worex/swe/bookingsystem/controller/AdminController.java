package com.worex.swe.bookingsystem.controller;

import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import com.worex.swe.bookingsystem.service.user_service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;

    @PutMapping("/users/{username}/promote")
    public UserResponseDTO makeAdmin(@PathVariable String username) {
        return userService.makeAdmin(username);
    }
}
