package com.hotello.backend.repository;

import com.hotello.backend.domain.AppearanceConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppearanceConfigRepository extends JpaRepository<AppearanceConfig, Long> {
}
