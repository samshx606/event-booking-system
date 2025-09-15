package com.worex.swe.bookingsystem.controller;

import com.worex.swe.bookingsystem.dto.event.EventDTO;
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

import java.util.List;

@RestController
@RequestMapping("api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id){
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @GetMapping
    public ResponseEntity<Page<EventDTO>> getAllEvents(
            @PageableDefault(page = 0, size = 10, sort = "title") Pageable pageable){
        return ResponseEntity.ok(eventService.getAllEvents(pageable));
    }

    @PostMapping("")
    public ResponseEntity<EventDTO> createEvent(
            @Valid @RequestBody EventDTO eventRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(eventRequestDTO, userDetails.getUsername()));
    }

    @PutMapping("{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id,
                                                @Valid @RequestBody EventDTO eventRequestDTO) {
        return ResponseEntity.ok(eventService.updateEvent(id, eventRequestDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

}
