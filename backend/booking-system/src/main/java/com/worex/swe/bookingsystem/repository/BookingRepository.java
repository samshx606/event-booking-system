package com.worex.swe.bookingsystem.repository;
import com.worex.swe.bookingsystem.model.Booking;
import com.worex.swe.bookingsystem.model.Event;
import com.worex.swe.bookingsystem.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findByUserId(Long userId, Pageable pageable);
    Page<Booking> findAll(Pageable pageable);
    Optional<Booking> findByUserAndEvent(User user, Event event);
}
