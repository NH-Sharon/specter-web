package com.spectertech.api.controller;

import com.spectertech.api.dto.ApiResponse;
import com.spectertech.api.entity.BlogPost;
import com.spectertech.api.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/blog")
@RequiredArgsConstructor
@Slf4j
public class PublicBlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BlogPost>>> listPublished(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<BlogPost> posts = blogService.findPublished(page, size);
        return ResponseEntity.ok(ApiResponse.success("Published blog posts retrieved", posts));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogPost>> getBySlug(@PathVariable String slug) {
        BlogPost post = blogService.findBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success("Blog post retrieved", post));
    }
}
