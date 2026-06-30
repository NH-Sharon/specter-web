package com.spectertech.api.service;

import com.spectertech.api.dto.BlogPostDto;
import com.spectertech.api.entity.BlogPost;
import com.spectertech.api.exception.NotFoundException;
import com.spectertech.api.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlogService {

    private final BlogPostRepository blogPostRepository;

    public Page<BlogPost> findAll(int page, int size) {
        return blogPostRepository.findAll(
            PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public Page<BlogPost> findPublished(int page, int size) {
        return blogPostRepository.findByPublishedTrueOrderByCreatedAtDesc(
            PageRequest.of(page, size));
    }

    public BlogPost findById(Long id) {
        return blogPostRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Blog post not found with id: " + id));
    }

    public BlogPost findBySlug(String slug) {
        return blogPostRepository.findBySlug(slug)
            .orElseThrow(() -> new NotFoundException("Blog post not found with slug: " + slug));
    }

    @Transactional
    public BlogPost create(BlogPostDto dto) {
        BlogPost post = BlogPost.builder()
            .title(dto.title())
            .slug(dto.slug())
            .excerpt(dto.excerpt())
            .content(dto.content())
            .category(dto.category())
            .tags(dto.tags())
            .author(Optional.ofNullable(dto.author()).orElse("Specter Technologies"))
            .coverImage(dto.coverImage())
            .published(dto.published())
            .featured(dto.featured())
            .readTime(Optional.ofNullable(dto.readTime()).orElse("5 min read"))
            .build();
        return blogPostRepository.save(post);
    }

    @Transactional
    public BlogPost update(Long id, BlogPostDto dto) {
        BlogPost post = findById(id);
        post.setTitle(dto.title());
        post.setSlug(dto.slug());
        post.setExcerpt(dto.excerpt());
        post.setContent(dto.content());
        post.setCategory(dto.category());
        post.setTags(dto.tags());
        if (dto.author() != null) post.setAuthor(dto.author());
        post.setCoverImage(dto.coverImage());
        post.setPublished(dto.published());
        post.setFeatured(dto.featured());
        if (dto.readTime() != null) post.setReadTime(dto.readTime());
        return blogPostRepository.save(post);
    }

    @Transactional
    public void delete(Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new NotFoundException("Blog post not found with id: " + id);
        }
        blogPostRepository.deleteById(id);
        log.info("Deleted blog post id: {}", id);
    }

    @Transactional
    public BlogPost togglePublish(Long id) {
        BlogPost post = findById(id);
        post.setPublished(!post.isPublished());
        return blogPostRepository.save(post);
    }
}
