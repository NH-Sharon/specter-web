package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.dto.BlogPostDto;
import com.spectertech.api.entity.BlogPost;
import com.spectertech.api.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/blog")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class BlogAdminController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BlogPost>>> listAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<BlogPost> posts = blogService.findAll(page, size);
        return ResponseEntity.ok(ApiResponse.success("Blog posts retrieved", posts));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogPost>> getById(@PathVariable Long id) {
        BlogPost post = blogService.findById(id);
        return ResponseEntity.ok(ApiResponse.success("Blog post retrieved", post));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BlogPost>> create(@RequestBody BlogPostDto dto) {
        BlogPost post = blogService.create(dto);
        return ResponseEntity.ok(ApiResponse.success("Blog post created", post));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogPost>> update(@PathVariable Long id, @RequestBody BlogPostDto dto) {
        BlogPost post = blogService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Blog post updated", post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Blog post deleted"));
    }

    @PatchMapping("/{id}/toggle-publish")
    public ResponseEntity<ApiResponse<BlogPost>> togglePublish(@PathVariable Long id) {
        BlogPost post = blogService.togglePublish(id);
        return ResponseEntity.ok(ApiResponse.success("Blog post publish status toggled", post));
    }
}
