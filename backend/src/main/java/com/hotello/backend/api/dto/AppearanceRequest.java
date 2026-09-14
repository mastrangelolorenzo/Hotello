package com.hotello.backend.api.dto;

import java.util.List;

public record AppearanceRequest(
        String logoUrl,
        String faviconUrl,
        String heroImageUrl,
        String primaryColor,
        String secondaryColor,
        String heroTitle,
        String heroSubtitle,
        List<String> activeLanguages,
        String facebook,
        String instagram,
        String twitter,
        String analyticsCode,
        String cookieBannerText
) {
}
