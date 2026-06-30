package com.spectertech.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "site_content")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sectionKey;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contentJson;

    @UpdateTimestamp
    private Instant updatedAt;
}
