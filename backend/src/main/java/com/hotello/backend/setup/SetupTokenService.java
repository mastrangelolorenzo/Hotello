package com.hotello.backend.setup;

import com.hotello.backend.repository.InstallationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Base64;

@Component
public class SetupTokenService implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(SetupTokenService.class);
    private static final SecureRandom RANDOM = new SecureRandom();

    private final InstallationRepository installationRepository;

    private volatile String currentToken;

    public SetupTokenService(InstallationRepository installationRepository) {
        this.installationRepository = installationRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        boolean completed = installationRepository.findById(1L)
                .map(installation -> installation.isCompleted())
                .orElse(false);

        if (completed) {
            return;
        }

        byte[] bytes = new byte[24];
        RANDOM.nextBytes(bytes);
        currentToken = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

        log.info("==============================================================");
        log.info("Hotello setup unlock token: {}", currentToken);
        log.info("Use this token to unlock the setup wizard at /setup");
        log.info("==============================================================");
    }

    public boolean isValid(String token) {
        return currentToken != null && currentToken.equals(token);
    }

    public void invalidate() {
        currentToken = null;
    }
}
