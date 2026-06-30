package com.spectertech.api.service;

import com.spectertech.api.dto.LoginRequest;
import com.spectertech.api.dto.LoginResponse;
import com.spectertech.api.entity.AdminUser;
import com.spectertech.api.exception.NotFoundException;
import com.spectertech.api.repository.AdminUserRepository;
import com.spectertech.api.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        AdminUser user = adminUserRepository.findByUsername(request.username())
            .orElseThrow(() -> new NotFoundException("Invalid username or password"));

        if (!user.isActive()) {
            throw new NotFoundException("Account is disabled");
        }

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new NotFoundException("Invalid username or password");
        }

        String token = jwtUtil.generate(user.getUsername());
        long expiresAt = System.currentTimeMillis() + jwtUtil.getExpiration();

        log.info("Admin login successful: {}", user.getUsername());

        return new LoginResponse(token, user.getUsername(), user.getFullName(), user.getRole(), expiresAt);
    }
}
