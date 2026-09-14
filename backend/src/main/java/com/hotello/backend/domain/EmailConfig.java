package com.hotello.backend.domain;

import com.hotello.backend.crypto.EncryptedStringConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class EmailConfig {

    @Id
    private Long id = 1L;

    private String smtpHost = "mailpit";

    private Integer smtpPort = 1025;

    private String smtpUser;

    @Convert(converter = EncryptedStringConverter.class)
    @Column(columnDefinition = "text")
    private String smtpPassword;

    private boolean tls;

    private String senderAddress;

    private String senderName;

    private String internalNotificationsEmail;

    private String signature;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSmtpHost() {
        return smtpHost;
    }

    public void setSmtpHost(String smtpHost) {
        this.smtpHost = smtpHost;
    }

    public Integer getSmtpPort() {
        return smtpPort;
    }

    public void setSmtpPort(Integer smtpPort) {
        this.smtpPort = smtpPort;
    }

    public String getSmtpUser() {
        return smtpUser;
    }

    public void setSmtpUser(String smtpUser) {
        this.smtpUser = smtpUser;
    }

    public String getSmtpPassword() {
        return smtpPassword;
    }

    public void setSmtpPassword(String smtpPassword) {
        this.smtpPassword = smtpPassword;
    }

    public boolean isTls() {
        return tls;
    }

    public void setTls(boolean tls) {
        this.tls = tls;
    }

    public String getSenderAddress() {
        return senderAddress;
    }

    public void setSenderAddress(String senderAddress) {
        this.senderAddress = senderAddress;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getInternalNotificationsEmail() {
        return internalNotificationsEmail;
    }

    public void setInternalNotificationsEmail(String internalNotificationsEmail) {
        this.internalNotificationsEmail = internalNotificationsEmail;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
