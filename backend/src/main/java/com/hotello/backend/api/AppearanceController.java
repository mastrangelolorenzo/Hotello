package com.hotello.backend.api;

import com.hotello.backend.api.dto.AppearanceRequest;
import com.hotello.backend.domain.AppearanceConfig;
import com.hotello.backend.repository.AppearanceConfigRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/setup/appearance")
public class AppearanceController {

    private final AppearanceConfigRepository repository;

    public AppearanceController(AppearanceConfigRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody AppearanceRequest request) {
        AppearanceConfig config = repository.findById(1L).orElseGet(AppearanceConfig::new);
        config.setLogoUrl(request.logoUrl());
        config.setFaviconUrl(request.faviconUrl());
        config.setHeroImageUrl(request.heroImageUrl());
        if (request.primaryColor() != null && !request.primaryColor().isBlank()) {
            config.setPrimaryColor(request.primaryColor());
        }
        if (request.secondaryColor() != null && !request.secondaryColor().isBlank()) {
            config.setSecondaryColor(request.secondaryColor());
        }
        config.setHeroTitle(request.heroTitle());
        config.setHeroSubtitle(request.heroSubtitle());
        config.setActiveLanguages(request.activeLanguages() == null ? List.of() : request.activeLanguages());
        config.setFacebook(request.facebook());
        config.setInstagram(request.instagram());
        config.setTwitter(request.twitter());
        config.setAnalyticsCode(request.analyticsCode());
        config.setCookieBannerText(request.cookieBannerText());
        repository.save(config);

        return ResponseEntity.ok().build();
    }
}
