package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.entity.JobPosting;
import com.spectertech.api.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Slf4j
public class PublicJobsController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<JobPosting>>> listActive() {
        List<JobPosting> jobs = jobService.findActive();
        return ResponseEntity.ok(ApiResponse.success("Active job postings retrieved", jobs));
    }
}
