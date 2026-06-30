package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @GetMapping("/ping")
    public ResponseEntity<ApiResponse<Map<String, String>>> ping() {
        return ResponseEntity.ok(ApiResponse.success("pong",
            Map.of("service", "Specter Technologies API", "version", "1.0.0")));
    }
}
