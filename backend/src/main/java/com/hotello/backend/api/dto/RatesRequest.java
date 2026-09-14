package com.hotello.backend.api.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record RatesRequest(List<RateItem> rates) {

    public record RateItem(
            UUID roomTypeId,
            BigDecimal basePrice,
            String currency,
            BigDecimal extraGuestPrice,
            Integer minStayNights,
            boolean breakfastIncluded,
            BigDecimal breakfastPrice
    ) {
    }
}
