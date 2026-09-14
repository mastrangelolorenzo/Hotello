package com.hotello.backend.api.dto;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record FiscalDataRequest(
        @NotBlank String companyName,
        @NotBlank String vatNumber,
        @NotBlank String taxCode,
        String legalAddress,
        String vatRegime,
        String accommodationVatRate,
        String sdiOrPec,
        String cin,
        String cir,
        String istatCode,
        String alloggiatiUsername,
        String alloggiatiPassword,
        String alloggiatiWsKey,
        boolean touristTaxActive,
        BigDecimal touristTaxAmount,
        Integer touristTaxMaxNights,
        Integer touristTaxExemptionAge,
        String touristTaxExemptions
) {
}
