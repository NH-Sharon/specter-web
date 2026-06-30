package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.entity.SiteContent;
import com.spectertech.api.service.ContentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/content")
@RequiredArgsConstructor
@Slf4j
public class PublicContentController {

    private final ContentService contentService;

    @GetMapping("/{key}")
    public ResponseEntity<ApiResponse<SiteContent>> getByKey(@PathVariable String key) {
        SiteContent content = contentService.findByKey(key);
        return ResponseEntity.ok(ApiResponse.success("Content section retrieved", content));
    }
}
