package com.hotello.backend.repository;

import com.hotello.backend.domain.RoomUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoomUnitRepository extends JpaRepository<RoomUnit, UUID> {
}
