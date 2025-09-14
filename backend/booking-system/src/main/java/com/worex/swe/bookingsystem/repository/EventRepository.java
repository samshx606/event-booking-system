package com.worex.swe.bookingsystem.repository;

import com.worex.swe.bookingsystem.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Override
    Page<Event> findAll(Pageable pageable);
}
