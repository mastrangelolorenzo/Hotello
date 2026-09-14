package com.hotello.backend.api.dto;

import java.util.List;
import java.util.UUID;

public record RoomsRequest(
        List<RoomTypeItem> types,
        List<RoomUnitItem> units
) {

    public record RoomTypeItem(
            UUID id,
            String name,
            String description,
            Integer standardOccupancy,
            Integer maxOccupancy,
            Integer bedCount,
            Integer surfaceSqm,
            List<String> amenities
    ) {
    }

    public record RoomUnitItem(
            UUID id,
            String numberOrName,
            String floor,
            UUID typeId,
            String internalNotes,
            boolean active
    ) {
    }
}
