package com.spectertech.api.dto;

public record BlogPostDto(
    String title,
    String slug,
    String excerpt,
    String content,
    String category,
    String tags,
    String author,
    String coverImage,
    boolean published,
    boolean featured,
    String readTime
) {}
