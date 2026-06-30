package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.dto.PortfolioProjectDto;
import com.spectertech.api.entity.PortfolioProject;
import com.spectertech.api.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/portfolio")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class PortfolioAdminController {

    private final PortfolioService portfolioService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PortfolioProject>>> listAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<PortfolioProject> projects = portfolioService.findAll(page, size);
        return ResponseEntity.ok(ApiResponse.success("Portfolio projects retrieved", projects));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PortfolioProject>> getById(@PathVariable Long id) {
        PortfolioProject project = portfolioService.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Portfolio project retrieved", project));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PortfolioProject>> create(@RequestBody PortfolioProjectDto dto) {
        PortfolioProject project = portfolioService.create(dto);
        return ResponseEntity.ok(ApiResponse.success("Portfolio project created", project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PortfolioProject>> update(@PathVariable Long id, @RequestBody PortfolioProjectDto dto) {
        PortfolioProject project = portfolioService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Portfolio project updated", project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        portfolioService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Portfolio project deleted"));
    }
}
