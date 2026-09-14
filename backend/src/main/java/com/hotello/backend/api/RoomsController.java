package com.hotello.backend.api;

import com.hotello.backend.api.dto.RoomsRequest;
import com.hotello.backend.domain.RoomType;
import com.hotello.backend.domain.RoomUnit;
import com.hotello.backend.repository.RateRepository;
import com.hotello.backend.repository.RoomTypeRepository;
import com.hotello.backend.repository.RoomUnitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/setup/rooms")
public class RoomsController {

    private final RoomTypeRepository roomTypeRepository;
    private final RoomUnitRepository roomUnitRepository;
    private final RateRepository rateRepository;

    public RoomsController(
            RoomTypeRepository roomTypeRepository,
            RoomUnitRepository roomUnitRepository,
            RateRepository rateRepository
    ) {
        this.roomTypeRepository = roomTypeRepository;
        this.roomUnitRepository = roomUnitRepository;
        this.rateRepository = rateRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Void> save(@RequestBody RoomsRequest request) {
        List<RoomsRequest.RoomTypeItem> incomingTypes = request.types() == null ? List.of() : request.types();
        List<RoomsRequest.RoomUnitItem> incomingUnits = request.units() == null ? List.of() : request.units();

        if (incomingTypes.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Set<UUID> incomingTypeIds = incomingTypes.stream()
                .map(RoomsRequest.RoomTypeItem::id)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        roomUnitRepository.deleteAll();
        rateRepository.findAll().stream()
                .filter(rate -> !incomingTypeIds.contains(rate.getRoomTypeId()))
                .forEach(rateRepository::delete);
        roomTypeRepository.findAll().stream()
                .filter(type -> !incomingTypeIds.contains(type.getId()))
                .forEach(roomTypeRepository::delete);

        Map<UUID, RoomType> savedTypes = new LinkedHashMap<>();
        for (RoomsRequest.RoomTypeItem item : incomingTypes) {
            RoomType type = new RoomType();
            type.setId(item.id() != null ? item.id() : UUID.randomUUID());
            type.setName(item.name());
            type.setDescription(item.description());
            type.setStandardOccupancy(item.standardOccupancy());
            type.setMaxOccupancy(item.maxOccupancy());
            type.setBedCount(item.bedCount());
            type.setSurfaceSqm(item.surfaceSqm());
            type.setAmenities(item.amenities() == null ? List.of() : item.amenities());
            roomTypeRepository.save(type);
            savedTypes.put(type.getId(), type);
        }

        for (RoomsRequest.RoomUnitItem item : incomingUnits) {
            RoomUnit unit = new RoomUnit();
            unit.setId(item.id() != null ? item.id() : UUID.randomUUID());
            unit.setNumberOrName(item.numberOrName());
            unit.setFloor(item.floor());
            unit.setRoomType(item.typeId() != null ? savedTypes.get(item.typeId()) : null);
            unit.setInternalNotes(item.internalNotes());
            unit.setActive(item.active());
            roomUnitRepository.save(unit);
        }

        return ResponseEntity.ok().build();
    }
}
