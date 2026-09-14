package com.hotello.backend.api.dto;

public record PaymentsRequest(
        String mode,
        String stripePublishableKey,
        String stripeSecretKey,
        String stripeWebhookSecret,
        boolean bankTransferAccepted,
        String iban,
        String accountHolder,
        boolean payAtProperty
) {
}
