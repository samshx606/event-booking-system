package com.worex.swe.bookingsystem.dto.booking;

import com.worex.swe.bookingsystem.dto.event.EventResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.worex.swe.bookingsystem.dto.user.UserResponseDTO;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
    private Long id;
    private UserResponseDTO user;
    private EventResponseDto event;
    private Integer quantity;
    private LocalDateTime bookingDate;
}
