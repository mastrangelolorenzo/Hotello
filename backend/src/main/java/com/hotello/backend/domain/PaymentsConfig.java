package com.hotello.backend.domain;

import com.hotello.backend.crypto.EncryptedStringConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class PaymentsConfig {

    @Id
    private Long id = 1L;

    private String mode;

    private String stripePublishableKey;

    @Convert(converter = EncryptedStringConverter.class)
    @Column(columnDefinition = "text")
    private String stripeSecretKey;

    @Convert(converter = EncryptedStringConverter.class)
    @Column(columnDefinition = "text")
    private String stripeWebhookSecret;

    private boolean bankTransferAccepted;

    private String iban;

    private String accountHolder;

    private boolean payAtProperty;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getStripePublishableKey() {
        return stripePublishableKey;
    }

    public void setStripePublishableKey(String stripePublishableKey) {
        this.stripePublishableKey = stripePublishableKey;
    }

    public String getStripeSecretKey() {
        return stripeSecretKey;
    }

    public void setStripeSecretKey(String stripeSecretKey) {
        this.stripeSecretKey = stripeSecretKey;
    }

    public String getStripeWebhookSecret() {
        return stripeWebhookSecret;
    }

    public void setStripeWebhookSecret(String stripeWebhookSecret) {
        this.stripeWebhookSecret = stripeWebhookSecret;
    }

    public boolean isBankTransferAccepted() {
        return bankTransferAccepted;
    }

    public void setBankTransferAccepted(boolean bankTransferAccepted) {
        this.bankTransferAccepted = bankTransferAccepted;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public void setAccountHolder(String accountHolder) {
        this.accountHolder = accountHolder;
    }

    public boolean isPayAtProperty() {
        return payAtProperty;
    }

    public void setPayAtProperty(boolean payAtProperty) {
        this.payAtProperty = payAtProperty;
    }
}
