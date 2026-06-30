package com.spectertech.api.repository;

import com.spectertech.api.entity.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    Page<BlogPost> findByPublishedTrueOrderByCreatedAtDesc(Pageable pageable);

    Optional<BlogPost> findBySlug(String slug);
}
