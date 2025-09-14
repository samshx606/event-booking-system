package com.worex.swe.bookingsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String title;

    @Size(max = 255)
    @Column(length = 255)
    private String description;

    @NotBlank
    @Size(max = 30)
    @Column(nullable = false, length = 30)
    private String category;

    @Column(nullable = false)
    private LocalDateTime date;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Size(max = 255)
    @Column(length = 255)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;
}
