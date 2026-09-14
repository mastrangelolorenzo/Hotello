package com.hotello.backend.api.dto;

public record EmailRequest(
        String smtpHost,
        Integer smtpPort,
        String smtpUser,
        String smtpPassword,
        boolean tls,
        String senderAddress,
        String senderName,
        String internalNotificationsEmail,
        String signature
) {
}
