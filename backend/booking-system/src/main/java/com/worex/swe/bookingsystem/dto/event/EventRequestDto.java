package com.worex.swe.bookingsystem.dto.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Getter @Setter
public class EventRequestDto {

    @NotBlank
    @Size(max = 50)
    private String title;

    @Size(max = 255)
    private String description;

    @NotBlank
    @Size(max = 30)
    private String category;

    @NotNull
    private LocalDateTime date;

    @NotBlank
    @Size(max = 100)
    private String location;

    @NotNull
    private BigDecimal price;

    @Size(max = 255)
    private String imageUrl;

}

