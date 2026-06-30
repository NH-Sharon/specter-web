package com.spectertech.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    String email,

    @NotBlank(message = "Company is required")
    @Size(min = 2, max = 100, message = "Company must be between 2 and 100 characters")
    String company,

    String phone,

    String service,

    String budget,

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 5000, message = "Message must be between 10 and 5000 characters")
    String message
) {}
