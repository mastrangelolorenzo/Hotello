package com.hotello.backend.api.dto;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record PropertyRequest(
        @NotBlank String commercialName,
        @NotBlank String type,
        Integer starRating,
        @NotBlank String shortDescription,
        String longDescription,
        @NotBlank String street,
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
