package com.spectertech.api.dto;

public record JobPostingDto(
    String title,
    String department,
    String location,
    String type,
    String level,
    String description,
    String requirements,
    String responsibilities,
    String salaryRange,
    boolean active
) {}
