package com.worex.swe.bookingsystem.mapper;

import com.worex.swe.bookingsystem.dto.event.EventRequestDto;
import com.worex.swe.bookingsystem.dto.event.EventResponseDto;
import com.worex.swe.bookingsystem.model.Event;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventMapper {
    Event toEvent(EventRequestDto dto);
    EventResponseDto toEventDTO(Event entity);
}
