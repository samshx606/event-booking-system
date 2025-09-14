package com.worex.swe.bookingsystem.controller;

import com.worex.swe.bookingsystem.dto.event.EventDTO;
import com.worex.swe.bookingsystem.dto.user.UserRequestDTO;
import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import com.worex.swe.bookingsystem.service.event_service.EventService;
import com.worex.swe.bookingsystem.service.user_service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final EventService eventService;

    // User management
    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/users")
    public ResponseEntity<Page<UserResponseDTO>> getAllUsers(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        return ResponseEntity.ok(userService.getAllUsers(pageable));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Event management
    @PostMapping("/events")
    public ResponseEntity<EventDTO> createEvent(
            @Valid @RequestBody EventDTO eventRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(eventRequestDTO, userDetails.getUsername()));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id,
                                                @Valid @RequestBody EventDTO eventRequestDTO) {
        return ResponseEntity.ok(eventService.updateEvent(id, eventRequestDTO));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
