package com.worex.swe.bookingsystem.dto.booking;

import com.worex.swe.bookingsystem.dto.event.EventDTO;
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
    private UserResponseDTO user;
    private EventDTO event;
    private Integer quantity;
    private LocalDateTime bookingDate;
}
