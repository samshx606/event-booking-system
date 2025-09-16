package com.worex.swe.bookingsystem.dto.event;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
public class EventResponseDto {

    private Long id;
    private String title;
    private String description;
    private String category;
    private LocalDateTime date;
    private String location;
    private BigDecimal price;
    private String imageUrl;
}
