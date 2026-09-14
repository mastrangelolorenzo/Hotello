package com.hotello.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.math.BigDecimal;

@Entity
public class FiscalData {

    @Id
    private Long id = 1L;

    private String companyName;

    private String vatNumber;

    private String taxCode;

    private String legalAddress;

    private String vatRegime;

    private String accommodationVatRate;

    private String sdiOrPec;

    private String cin;

    private String cir;

    private String istatCode;

    private String alloggiatiUsername;

    private String alloggiatiPassword;

    private String alloggiatiWsKey;

    private boolean touristTaxActive;

    private BigDecimal touristTaxAmount;

    private Integer touristTaxMaxNights;

    private Integer touristTaxExemptionAge;

    private String touristTaxExemptions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getVatNumber() {
        return vatNumber;
    }

    public void setVatNumber(String vatNumber) {
        this.vatNumber = vatNumber;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getLegalAddress() {
        return legalAddress;
    }

    public void setLegalAddress(String legalAddress) {
        this.legalAddress = legalAddress;
    }

    public String getVatRegime() {
        return vatRegime;
    }

    public void setVatRegime(String vatRegime) {
        this.vatRegime = vatRegime;
    }

    public String getAccommodationVatRate() {
        return accommodationVatRate;
    }

    public void setAccommodationVatRate(String accommodationVatRate) {
        this.accommodationVatRate = accommodationVatRate;
    }

    public String getSdiOrPec() {
        return sdiOrPec;
    }

    public void setSdiOrPec(String sdiOrPec) {
        this.sdiOrPec = sdiOrPec;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getCir() {
        return cir;
    }

    public void setCir(String cir) {
        this.cir = cir;
    }

    public String getIstatCode() {
        return istatCode;
    }

    public void setIstatCode(String istatCode) {
        this.istatCode = istatCode;
    }

    public String getAlloggiatiUsername() {
        return alloggiatiUsername;
    }

    public void setAlloggiatiUsername(String alloggiatiUsername) {
        this.alloggiatiUsername = alloggiatiUsername;
    }

    public String getAlloggiatiPassword() {
        return alloggiatiPassword;
    }

    public void setAlloggiatiPassword(String alloggiatiPassword) {
        this.alloggiatiPassword = alloggiatiPassword;
    }

    public String getAlloggiatiWsKey() {
        return alloggiatiWsKey;
    }

    public void setAlloggiatiWsKey(String alloggiatiWsKey) {
        this.alloggiatiWsKey = alloggiatiWsKey;
    }

    public boolean isTouristTaxActive() {
        return touristTaxActive;
    }

    public void setTouristTaxActive(boolean touristTaxActive) {
        this.touristTaxActive = touristTaxActive;
    }

    public BigDecimal getTouristTaxAmount() {
        return touristTaxAmount;
    }

    public void setTouristTaxAmount(BigDecimal touristTaxAmount) {
        this.touristTaxAmount = touristTaxAmount;
    }

    public Integer getTouristTaxMaxNights() {
        return touristTaxMaxNights;
    }

    public void setTouristTaxMaxNights(Integer touristTaxMaxNights) {
        this.touristTaxMaxNights = touristTaxMaxNights;
    }

    public Integer getTouristTaxExemptionAge() {
        return touristTaxExemptionAge;
    }

    public void setTouristTaxExemptionAge(Integer touristTaxExemptionAge) {
        this.touristTaxExemptionAge = touristTaxExemptionAge;
    }

    public String getTouristTaxExemptions() {
        return touristTaxExemptions;
    }

    public void setTouristTaxExemptions(String touristTaxExemptions) {
        this.touristTaxExemptions = touristTaxExemptions;
    }
}
