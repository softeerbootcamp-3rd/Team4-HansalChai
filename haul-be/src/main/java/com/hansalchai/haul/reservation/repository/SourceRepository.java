package com.hansalchai.haul.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hansalchai.haul.reservation.entity.Source;

public interface SourceRepository extends JpaRepository<Source, Long> {
}
