package com.hotello.backend.repository;

import com.hotello.backend.domain.PaymentsConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentsConfigRepository extends JpaRepository<PaymentsConfig, Long> {
}
