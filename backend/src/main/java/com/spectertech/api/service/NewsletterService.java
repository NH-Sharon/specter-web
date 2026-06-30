package com.spectertech.api.service;

import com.spectertech.api.entity.NewsletterSubscription;
import com.spectertech.api.exception.ConflictException;
import com.spectertech.api.repository.NewsletterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NewsletterService {

    private final NewsletterRepository repository;

    @Transactional
    public void subscribe(String email) {
        if (repository.existsByEmail(email)) {
            throw new ConflictException("This email is already subscribed to our newsletter.");
        }
        repository.save(NewsletterSubscription.builder().email(email).build());
        log.info("Newsletter subscription: {}", email);
    }

    @Transactional
    public void unsubscribe(String email) {
        repository.findByEmail(email).ifPresent(sub -> {
            sub.setActive(false);
            repository.save(sub);
        });
    }
}
