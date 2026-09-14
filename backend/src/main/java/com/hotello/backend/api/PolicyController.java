package com.hotello.backend.api;

import com.hotello.backend.api.dto.PolicyRequest;
import com.hotello.backend.domain.Policy;
import com.hotello.backend.repository.PolicyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup/policy")
public class PolicyController {

    private final PolicyRepository repository;

    public PolicyController(PolicyRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody PolicyRequest request) {
        Policy policy = repository.findById(1L).orElseGet(Policy::new);
        policy.setCheckInFrom(request.checkInFrom());
        policy.setCheckInTo(request.checkInTo());
        policy.setCheckOutBy(request.checkOutBy());
        policy.setCancellationPolicy(request.cancellationPolicy());
        policy.setFreeCancellationDays(request.freeCancellationDays());
        policy.setPenaltyPercentage(request.penaltyPercentage());
        policy.setDepositRequired(request.depositRequired());
        policy.setDepositPercentage(request.depositPercentage());
        policy.setPetsAllowed(request.petsAllowed());
        policy.setSmokingAllowed(request.smokingAllowed());
        policy.setMinCheckInAge(request.minCheckInAge());
        policy.setTermsText(request.termsText());
        repository.save(policy);

        return ResponseEntity.ok().build();
    }
}
