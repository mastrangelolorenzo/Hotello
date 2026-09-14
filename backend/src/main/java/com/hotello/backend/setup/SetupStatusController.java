package com.hotello.backend.setup;

import com.hotello.backend.domain.Installation;
import com.hotello.backend.repository.InstallationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/setup")
public class SetupStatusController {

    private final InstallationRepository installationRepository;
    private final SetupTokenService setupTokenService;

    public SetupStatusController(InstallationRepository installationRepository, SetupTokenService setupTokenService) {
        this.installationRepository = installationRepository;
        this.setupTokenService = setupTokenService;
    }

    @GetMapping("/status")
    public StatusResponse status() {
        boolean completed = installationRepository.findById(1L)
                .map(Installation::isCompleted)
                .orElse(false);
        return new StatusResponse(completed);
    }

    @PostMapping("/unlock")
    public ResponseEntity<Void> unlock(@RequestBody UnlockRequest request) {
        if (!setupTokenService.isValid(request.token())) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/complete")
    public ResponseEntity<Void> complete() {
        Installation installation = installationRepository.findById(1L).orElseGet(Installation::new);
        installation.setCompleted(true);
        installation.setCompletedAt(Instant.now());
        installationRepository.save(installation);
        setupTokenService.invalidate();
        return ResponseEntity.ok().build();
    }

    public record StatusResponse(boolean completed) {
    }

    public record UnlockRequest(String token) {
    }
}
