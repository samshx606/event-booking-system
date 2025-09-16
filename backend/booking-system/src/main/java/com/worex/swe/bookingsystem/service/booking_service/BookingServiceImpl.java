package com.worex.swe.bookingsystem.service.booking_service;

import com.worex.swe.bookingsystem.dto.booking.BookingRequestDTO;
import com.worex.swe.bookingsystem.dto.booking.BookingResponseDTO;
import com.worex.swe.bookingsystem.exception.ResourceNotFoundException;
import com.worex.swe.bookingsystem.mapper.BookingMapper;
import com.worex.swe.bookingsystem.model.Booking;
import com.worex.swe.bookingsystem.model.Event;
import com.worex.swe.bookingsystem.model.User;
import com.worex.swe.bookingsystem.repository.BookingRepository;
import com.worex.swe.bookingsystem.repository.EventRepository;
import com.worex.swe.bookingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final BookingMapper bookingMapper;

    @Override
    public Page<BookingResponseDTO> getBookingByUserId(Long id, Pageable pageable) {
        Page<Booking> bookings = bookingRepository.findByUserId(id, pageable);
        return bookings.map(bookingMapper::toResponseDTO);
    }

    @Override
    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequestDTO, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Event event = eventRepository.findById(bookingRequestDTO.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + bookingRequestDTO.getEventId()));

        Booking booking = bookingRepository.findByUserAndEvent(user, event)
                .orElse( Booking.builder().user(user)
                        .quantity(0)
                        .bookingDate(LocalDateTime.now())
                        .user(user)
                        .event(event)
                        .build());
        booking.setQuantity(booking.getQuantity() + 1);
        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toResponseDTO(savedBooking);
    }
}
