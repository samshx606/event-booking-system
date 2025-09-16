package com.worex.swe.bookingsystem.service.booking_service;

import com.worex.swe.bookingsystem.dto.booking.BookingRequestDTO;
import com.worex.swe.bookingsystem.dto.booking.BookingResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookingService {
    Page<BookingResponseDTO> getBookingByUserId(Long id, Pageable pageable);
    BookingResponseDTO createBooking(BookingRequestDTO bookingRequestDTO, String username);
}
