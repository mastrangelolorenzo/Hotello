package com.hotello.backend.repository;

import com.hotello.backend.domain.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RateRepository extends JpaRepository<Rate, UUID> {
}
