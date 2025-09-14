package com.worex.swe.bookingsystem.dto.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {

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
    @DecimalMin("0.0")
    private BigDecimal price;

    @Size(max = 255)
    private String imageUrl;
}
