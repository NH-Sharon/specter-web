package com.spectertech.api.dto;

public record PortfolioProjectDto(
    String title,
    String client,
    String category,
    String description,
    String technologies,
    String metrics,
    String year,
    boolean featured,
    boolean published
) {}
