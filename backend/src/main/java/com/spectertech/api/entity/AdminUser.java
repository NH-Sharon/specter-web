package com.spectertech.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "admin_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String fullName;

    @Builder.Default
    private String role = "ADMIN";

    @Builder.Default
    private boolean active = true;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;
}
