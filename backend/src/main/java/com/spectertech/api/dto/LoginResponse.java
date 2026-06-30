package com.spectertech.api.dto;

public record LoginResponse(
    String token,
    String username,
    String fullName,
    String role,
    long expiresAt
) {}
