package com.worex.swe.bookingsystem.controller;
import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import com.worex.swe.bookingsystem.model.User;
import com.worex.swe.bookingsystem.service.user_service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> viewProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userService.viewProfile(userDetails));
    }
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteProfile(@AuthenticationPrincipal UserDetails userDetails) {
        userService.deleteProfile(userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
    @GetMapping("")
    public ResponseEntity<Page<UserResponseDTO>> getAllUsers(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        return ResponseEntity.ok(userService.getAllUsers(pageable));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
