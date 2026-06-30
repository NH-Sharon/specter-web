package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.service.NewsletterService;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/newsletter")
@RequiredArgsConstructor
@Validated
public class NewsletterController {

    private final NewsletterService newsletterService;

    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<Void>> subscribe(
            @RequestParam @Email(message = "Invalid email address") String email) {
        newsletterService.subscribe(email);
        return ResponseEntity.ok(ApiResponse.success("Successfully subscribed to our newsletter!"));
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<ApiResponse<Void>> unsubscribe(
            @RequestParam @Email String email) {
        newsletterService.unsubscribe(email);
        return ResponseEntity.ok(ApiResponse.success("You have been unsubscribed."));
    }
}
