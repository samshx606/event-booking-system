package com.worex.swe.bookingsystem.controller;

import com.worex.swe.bookingsystem.dto.event.EventDTO;
import com.worex.swe.bookingsystem.service.event_service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
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


}
