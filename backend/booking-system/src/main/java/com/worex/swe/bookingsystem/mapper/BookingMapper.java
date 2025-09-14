package com.worex.swe.bookingsystem.mapper;

import com.worex.swe.bookingsystem.dto.booking.BookingRequestDTO;
import com.worex.swe.bookingsystem.dto.booking.BookingResponseDTO;
import com.worex.swe.bookingsystem.model.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    Booking toBooking(BookingRequestDTO dto);
    BookingResponseDTO toResponseDTO(Booking entity);
}
