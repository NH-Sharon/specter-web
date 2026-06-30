package com.spectertech.api.dto;

public record LoginRequest(
    String username,
    String password
) {}
