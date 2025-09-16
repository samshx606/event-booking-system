package com.worex.swe.bookingsystem.controller;

import com.worex.swe.bookingsystem.dto.event.EventRequestDto;
import com.worex.swe.bookingsystem.dto.event.EventResponseDto;
import com.worex.swe.bookingsystem.service.event_service.EventService;
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

@RestController
@RequestMapping("api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;
    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getEventById(@PathVariable Long id){
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @GetMapping
    public ResponseEntity<Page<EventResponseDto>> getAllEvents(
            @PageableDefault(page = 0, size = 10, sort = "title") Pageable pageable){
        return ResponseEntity.ok(eventService.getAllEvents(pageable));
    }

    @PostMapping("")
    public ResponseEntity<EventResponseDto> createEvent(
            @Valid @RequestBody EventRequestDto eventRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(eventRequestDTO, userDetails.getUsername()));
    }

    @PutMapping("{id}")
    public ResponseEntity<EventResponseDto> updateEvent(@PathVariable Long id,
                                                @Valid @RequestBody EventRequestDto eventRequestDTO) {
        return ResponseEntity.ok(eventService.updateEvent(id, eventRequestDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

}
