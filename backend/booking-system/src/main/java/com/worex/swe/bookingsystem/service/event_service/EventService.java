package com.worex.swe.bookingsystem.service.event_service;

import com.worex.swe.bookingsystem.dto.event.EventDTO;
import com.worex.swe.bookingsystem.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EventService {
    public EventDTO getEventById(Long id);
    public Page<EventDTO> getAllEvents(Pageable pageable);
    public EventDTO createEvent(EventDTO eventRequestDTO, String creatorUsername);
    public EventDTO updateEvent(Long id, EventDTO eventRequestDTO);
    public void deleteEvent(Long id);
}
