package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.dto.JobPostingDto;
import com.spectertech.api.entity.JobPosting;
import com.spectertech.api.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/jobs")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class JobAdminController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<JobPosting>>> listAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<JobPosting> jobs = jobService.findAll(page, size);
        return ResponseEntity.ok(ApiResponse.success("Job postings retrieved", jobs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobPosting>> getById(@PathVariable Long id) {
        JobPosting job = jobService.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Job posting retrieved", job));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<JobPosting>> create(@RequestBody JobPostingDto dto) {
        JobPosting job = jobService.create(dto);
        return ResponseEntity.ok(ApiResponse.success("Job posting created", job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobPosting>> update(@PathVariable Long id, @RequestBody JobPostingDto dto) {
        JobPosting job = jobService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Job posting updated", job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        jobService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Job posting deleted"));
    }

    @PatchMapping("/{id}/toggle-active")
    public ResponseEntity<ApiResponse<JobPosting>> toggleActive(@PathVariable Long id) {
        JobPosting job = jobService.toggleActive(id);
        return ResponseEntity.ok(ApiResponse.success("Job posting active status toggled", job));
    }
}
