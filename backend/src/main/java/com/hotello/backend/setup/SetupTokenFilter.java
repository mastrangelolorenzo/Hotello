package com.hotello.backend.setup;

import com.hotello.backend.repository.InstallationRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SetupTokenFilter extends OncePerRequestFilter {

    private static final String TOKEN_HEADER = "X-Setup-Token";

    private final SetupTokenService setupTokenService;
    private final InstallationRepository installationRepository;

    public SetupTokenFilter(SetupTokenService setupTokenService, InstallationRepository installationRepository) {
        this.setupTokenService = setupTokenService;
        this.installationRepository = installationRepository;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        if (!path.startsWith("/api/setup/")) {
            return true;
        }
        return path.equals("/api/setup/status");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        boolean completed = installationRepository.findById(1L)
                .map(installation -> installation.isCompleted())
                .orElse(false);

        if (completed) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Setup already completed");
            return;
        }

        String token = request.getHeader(TOKEN_HEADER);
        if (!setupTokenService.isValid(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or missing setup token");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
