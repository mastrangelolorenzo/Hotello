package com.hotello.backend.api;

import com.hotello.backend.api.dto.PaymentsRequest;
import com.hotello.backend.domain.PaymentsConfig;
import com.hotello.backend.repository.PaymentsConfigRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup/payments")
public class PaymentsController {

    private final PaymentsConfigRepository repository;

    public PaymentsController(PaymentsConfigRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody PaymentsRequest request) {
        PaymentsConfig config = repository.findById(1L).orElseGet(PaymentsConfig::new);
        config.setMode(request.mode());
        config.setStripePublishableKey(request.stripePublishableKey());
        config.setStripeSecretKey(request.stripeSecretKey());
        config.setStripeWebhookSecret(request.stripeWebhookSecret());
        config.setBankTransferAccepted(request.bankTransferAccepted());
        config.setIban(request.iban());
        config.setAccountHolder(request.accountHolder());
        config.setPayAtProperty(request.payAtProperty());
        repository.save(config);

        return ResponseEntity.ok().build();
    }
}
