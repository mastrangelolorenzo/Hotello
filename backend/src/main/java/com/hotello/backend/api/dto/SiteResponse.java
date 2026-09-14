package com.hotello.backend.api.dto;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public record SiteResponse(
        PropertyInfo property,
        List<RoomInfo> rooms,
        PolicyInfo policy,
        AppearanceInfo appearance
) {

    public record PropertyInfo(
            String commercialName,
            String type,
            Integer starRating,
            String shortDescription,
            String longDescription,
            String street,
            String postalCode,
            String city,
            String province,
            String country,
            BigDecimal latitude,
            BigDecimal longitude,
            String phone,
            String publicEmail,
            String existingWebsite
    ) {
    }

    public record RoomInfo(
            UUID id,
            String name,
            String description,
            Integer maxOccupancy,
            Integer bedCount,
            Integer surfaceSqm,
            List<String> amenities,
            BigDecimal basePrice,
            String currency,
            BigDecimal extraGuestPrice,
            Integer minStayNights,
            boolean breakfastIncluded,
            BigDecimal breakfastPrice
    ) {
    }

    public record PolicyInfo(
            LocalTime checkInFrom,
            LocalTime checkInTo,
            LocalTime checkOutBy,
            String cancellationPolicy,
            boolean depositRequired,
            boolean petsAllowed,
            boolean smokingAllowed
    ) {
    }

    public record AppearanceInfo(
            String primaryColor,
            String secondaryColor,
            String heroTitle,
            String heroSubtitle,
            String logoUrl,
            String faviconUrl,
            String heroImageUrl,
            String facebook,
            String instagram,
            String twitter
    ) {
    }
}
