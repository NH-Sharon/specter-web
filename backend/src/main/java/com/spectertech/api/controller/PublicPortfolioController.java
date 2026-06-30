package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.entity.PortfolioProject;
import com.spectertech.api.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/portfolio")
@RequiredArgsConstructor
@Slf4j
public class PublicPortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PortfolioProject>>> listPublished(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<PortfolioProject> projects = portfolioService.findPublished(page, size);
        return ResponseEntity.ok(ApiResponse.success("Published portfolio projects retrieved", projects));
    }
}
