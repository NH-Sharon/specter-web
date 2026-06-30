package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.dto.SiteContentDto;
import com.spectertech.api.entity.SiteContent;
import com.spectertech.api.service.ContentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/content")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class ContentAdminController {

    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SiteContent>>> listAll() {
        List<SiteContent> sections = contentService.findAll();
        return ResponseEntity.ok(ApiResponse.success("Content sections retrieved", sections));
    }

    @GetMapping("/{key}")
    public ResponseEntity<ApiResponse<SiteContent>> getByKey(@PathVariable String key) {
        SiteContent content = contentService.findByKey(key);
        return ResponseEntity.ok(ApiResponse.success("Content section retrieved", content));
    }

    @PutMapping("/{key}")
    public ResponseEntity<ApiResponse<SiteContent>> upsert(@PathVariable String key, @RequestBody SiteContentDto dto) {
        SiteContent content = contentService.upsert(key, dto);
        return ResponseEntity.ok(ApiResponse.success("Content section saved", content));
    }
}
