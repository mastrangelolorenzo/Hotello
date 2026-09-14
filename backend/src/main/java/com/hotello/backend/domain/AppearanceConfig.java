package com.hotello.backend.domain;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class AppearanceConfig {

    @Id
    private Long id = 1L;

    private String logoUrl;

    private String faviconUrl;

    private String heroImageUrl;

    private String primaryColor = "#2563eb";

    private String secondaryColor = "#1e293b";

    private String heroTitle;

    private String heroSubtitle;

    @ElementCollection
    @CollectionTable(name = "appearance_active_language", joinColumns = @jakarta.persistence.JoinColumn(name = "appearance_id"))
    @Column(name = "language")
    private List<String> activeLanguages = new ArrayList<>();

    private String facebook;

    private String instagram;

    private String twitter;

    private String analyticsCode;

    private String cookieBannerText;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getFaviconUrl() {
        return faviconUrl;
    }

    public void setFaviconUrl(String faviconUrl) {
        this.faviconUrl = faviconUrl;
    }

    public String getHeroImageUrl() {
        return heroImageUrl;
    }

    public void setHeroImageUrl(String heroImageUrl) {
        this.heroImageUrl = heroImageUrl;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public String getSecondaryColor() {
        return secondaryColor;
    }

    public void setSecondaryColor(String secondaryColor) {
        this.secondaryColor = secondaryColor;
    }

    public String getHeroTitle() {
        return heroTitle;
    }

    public void setHeroTitle(String heroTitle) {
        this.heroTitle = heroTitle;
    }

    public String getHeroSubtitle() {
        return heroSubtitle;
    }

    public void setHeroSubtitle(String heroSubtitle) {
        this.heroSubtitle = heroSubtitle;
    }

    public List<String> getActiveLanguages() {
        return activeLanguages;
    }

    public void setActiveLanguages(List<String> activeLanguages) {
        this.activeLanguages = activeLanguages;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getAnalyticsCode() {
        return analyticsCode;
    }

    public void setAnalyticsCode(String analyticsCode) {
        this.analyticsCode = analyticsCode;
    }

    public String getCookieBannerText() {
        return cookieBannerText;
    }

    public void setCookieBannerText(String cookieBannerText) {
        this.cookieBannerText = cookieBannerText;
    }
}
