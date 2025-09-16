package com.worex.swe.bookingsystem.service.event_service;

import com.worex.swe.bookingsystem.dto.event.EventRequestDto;
import com.worex.swe.bookingsystem.dto.event.EventResponseDto;
import com.worex.swe.bookingsystem.exception.ResourceNotFoundException;
import com.worex.swe.bookingsystem.mapper.EventMapper;
import com.worex.swe.bookingsystem.model.Event;
import com.worex.swe.bookingsystem.model.User;
import com.worex.swe.bookingsystem.repository.EventRepository;
import com.worex.swe.bookingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final UserRepository userRepository;
    @Override
    public EventResponseDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return eventMapper.toEventDTO(event);
    }

    @Override
    public Page<EventResponseDto> getAllEvents(Pageable pageable) {
        Page<Event> events = eventRepository.findAll(pageable);
        return events.map(eventMapper::toEventDTO);
    }

    @Override
    @Transactional
    public EventResponseDto createEvent(EventRequestDto eventDTO, String creatorUsername) {
        User creator = userRepository.findByUsername(creatorUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + creatorUsername));
        Event event = eventMapper.toEvent(eventDTO);
        event.setCreator(creator); // set creator
        Event savedEvent = eventRepository.save(event);
        return eventMapper.toEventDTO(savedEvent);
    }

    @Override
    @Transactional
    public EventResponseDto updateEvent(Long id, EventRequestDto eventDTO) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        existingEvent.setTitle(eventDTO.getTitle());
        existingEvent.setDescription(eventDTO.getDescription());
        existingEvent.setCategory(eventDTO.getCategory());
        existingEvent.setDate(eventDTO.getDate());
        existingEvent.setLocation(eventDTO.getLocation());
        existingEvent.setPrice(eventDTO.getPrice());
        existingEvent.setImageUrl(eventDTO.getImageUrl());

        Event savedEvent = eventRepository.save(existingEvent);
        return eventMapper.toEventDTO(savedEvent);
    }

    @Override
    @Transactional
    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
}
