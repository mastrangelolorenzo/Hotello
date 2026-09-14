package com.hotello.backend.api;

import com.hotello.backend.api.dto.AdminAccountRequest;
import com.hotello.backend.domain.AdminAccount;
import com.hotello.backend.repository.AdminAccountRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup/admin-account")
public class AdminAccountController {

    private final AdminAccountRepository repository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AdminAccountController(AdminAccountRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody AdminAccountRequest request) {
        if (!request.password().equals(request.confirmPassword())) {
            return ResponseEntity.badRequest().build();
        }

        AdminAccount account = repository.findById(1L).orElseGet(AdminAccount::new);
        account.setEmail(request.email());
        account.setPasswordHash(passwordEncoder.encode(request.password()));
        account.setFirstName(request.firstName());
        account.setLastName(request.lastName());
        account.setInterfaceLanguage(request.interfaceLanguage());
        account.setTimezone(request.timezone());
        repository.save(account);

        return ResponseEntity.ok().build();
    }
}
