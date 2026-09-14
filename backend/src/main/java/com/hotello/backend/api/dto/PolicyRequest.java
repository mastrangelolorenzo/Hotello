package com.hotello.backend.api.dto;

import java.math.BigDecimal;
import java.time.LocalTime;

public record PolicyRequest(
        LocalTime checkInFrom,
        LocalTime checkInTo,
        LocalTime checkOutBy,
        String cancellationPolicy,
        Integer freeCancellationDays,
        BigDecimal penaltyPercentage,
        boolean depositRequired,
        BigDecimal depositPercentage,
        boolean petsAllowed,
        boolean smokingAllowed,
        Integer minCheckInAge,
        String termsText
) {
}
