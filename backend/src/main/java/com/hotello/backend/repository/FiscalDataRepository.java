package com.hotello.backend.repository;

import com.hotello.backend.domain.FiscalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FiscalDataRepository extends JpaRepository<FiscalData, Long> {
}
