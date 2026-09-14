package com.hotello.backend.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminAccountRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8) String password,
        @NotBlank @Size(min = 8) String confirmPassword,
        @NotBlank String firstName,
        @NotBlank String lastName,
        String interfaceLanguage,
        String timezone
) {
}
