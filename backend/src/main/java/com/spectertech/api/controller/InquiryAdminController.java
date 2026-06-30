package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.entity.ContactInquiry;
import com.spectertech.api.service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/inquiries")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class InquiryAdminController {

    private final InquiryService inquiryService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ContactInquiry>>> listAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<ContactInquiry> inquiries = inquiryService.findAll(page, size);
        return ResponseEntity.ok(ApiResponse.success("Inquiries retrieved", inquiries));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ContactInquiry>> getById(@PathVariable Long id) {
        ContactInquiry inquiry = inquiryService.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Inquiry retrieved", inquiry));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ContactInquiry>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        ContactInquiry inquiry = inquiryService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Inquiry status updated", inquiry));
    }
}
