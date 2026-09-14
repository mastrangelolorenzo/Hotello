package com.hotello.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalTime;

@Entity
public class Policy {

    @Id
    private Long id = 1L;

    private LocalTime checkInFrom;

    private LocalTime checkInTo;

    private LocalTime checkOutBy;

    private String cancellationPolicy;

    private Integer freeCancellationDays;

    private BigDecimal penaltyPercentage;

    private boolean depositRequired;

    private BigDecimal depositPercentage;

    private boolean petsAllowed;

    private boolean smokingAllowed;

    private Integer minCheckInAge;

    private String termsText;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getCheckInFrom() {
        return checkInFrom;
    }

    public void setCheckInFrom(LocalTime checkInFrom) {
        this.checkInFrom = checkInFrom;
    }

    public LocalTime getCheckInTo() {
        return checkInTo;
    }

    public void setCheckInTo(LocalTime checkInTo) {
        this.checkInTo = checkInTo;
    }

    public LocalTime getCheckOutBy() {
        return checkOutBy;
    }

    public void setCheckOutBy(LocalTime checkOutBy) {
        this.checkOutBy = checkOutBy;
    }

    public String getCancellationPolicy() {
        return cancellationPolicy;
    }

    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }

    public Integer getFreeCancellationDays() {
        return freeCancellationDays;
    }

    public void setFreeCancellationDays(Integer freeCancellationDays) {
        this.freeCancellationDays = freeCancellationDays;
    }

    public BigDecimal getPenaltyPercentage() {
        return penaltyPercentage;
    }

    public void setPenaltyPercentage(BigDecimal penaltyPercentage) {
        this.penaltyPercentage = penaltyPercentage;
    }

    public boolean isDepositRequired() {
        return depositRequired;
    }

    public void setDepositRequired(boolean depositRequired) {
        this.depositRequired = depositRequired;
    }

    public BigDecimal getDepositPercentage() {
        return depositPercentage;
    }

    public void setDepositPercentage(BigDecimal depositPercentage) {
        this.depositPercentage = depositPercentage;
    }

    public boolean isPetsAllowed() {
        return petsAllowed;
    }

    public void setPetsAllowed(boolean petsAllowed) {
        this.petsAllowed = petsAllowed;
    }

    public boolean isSmokingAllowed() {
        return smokingAllowed;
    }

    public void setSmokingAllowed(boolean smokingAllowed) {
        this.smokingAllowed = smokingAllowed;
    }

    public Integer getMinCheckInAge() {
        return minCheckInAge;
    }

    public void setMinCheckInAge(Integer minCheckInAge) {
        this.minCheckInAge = minCheckInAge;
    }

    public String getTermsText() {
        return termsText;
    }

    public void setTermsText(String termsText) {
        this.termsText = termsText;
    }
}
