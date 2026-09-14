package com.hotello.backend.api;

import com.hotello.backend.api.dto.EmailRequest;
import com.hotello.backend.domain.EmailConfig;
import com.hotello.backend.repository.EmailConfigRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup/email")
public class EmailConfigController {

    private final EmailConfigRepository repository;

    public EmailConfigController(EmailConfigRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody EmailRequest request) {
        EmailConfig config = repository.findById(1L).orElseGet(EmailConfig::new);
        config.setSmtpHost(request.smtpHost());
        config.setSmtpPort(request.smtpPort());
        config.setSmtpUser(request.smtpUser());
        config.setSmtpPassword(request.smtpPassword());
        config.setTls(request.tls());
        config.setSenderAddress(request.senderAddress());
        config.setSenderName(request.senderName());
        config.setInternalNotificationsEmail(request.internalNotificationsEmail());
        config.setSignature(request.signature());
        repository.save(config);

        return ResponseEntity.ok().build();
    }
}
