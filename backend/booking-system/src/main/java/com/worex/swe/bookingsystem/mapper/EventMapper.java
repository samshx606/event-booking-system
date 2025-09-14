package com.worex.swe.bookingsystem.mapper;

import com.worex.swe.bookingsystem.dto.event.EventDTO;
import com.worex.swe.bookingsystem.model.Event;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventMapper {
    Event toEvent(EventDTO dto);
    EventDTO toEventDTO(Event entity);
}
