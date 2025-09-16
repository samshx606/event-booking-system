package com.worex.swe.bookingsystem.service.event_service;

import com.worex.swe.bookingsystem.dto.event.EventRequestDto;
import com.worex.swe.bookingsystem.dto.event.EventResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventService {
    EventResponseDto getEventById(Long id);
    Page<EventResponseDto> getAllEvents(Pageable pageable);
    EventResponseDto createEvent(EventRequestDto eventRequestDTO, String creatorUsername);
    EventResponseDto updateEvent(Long id, EventRequestDto eventRequestDTO);
    void deleteEvent(Long id);
}
