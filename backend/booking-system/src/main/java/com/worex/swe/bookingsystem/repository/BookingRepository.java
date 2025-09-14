package com.worex.swe.bookingsystem.repository;
import com.worex.swe.bookingsystem.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findByUserId(Long userId, Pageable pageable);
    Page<Booking> findAll(Pageable pageable);
}
