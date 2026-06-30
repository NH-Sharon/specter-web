package com.spectertech.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "portfolio_projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String client;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String technologies;

    @Column(columnDefinition = "TEXT")
    private String metrics;

    private String year;

    @Builder.Default
    private boolean featured = false;

    @Builder.Default
    private boolean published = true;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;
}
