package com.spectertech.api.controller;

import com.spectertech.api.dto.ContactRequest;
import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Slf4j
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> submitContact(
            @Valid @RequestBody ContactRequest request) {
        log.info("Contact form submission from: {}", request.email());
        contactService.processContact(request);
        return ResponseEntity.ok(ApiResponse.success("Your message has been received. We will respond within 24 hours."));
    }
}
