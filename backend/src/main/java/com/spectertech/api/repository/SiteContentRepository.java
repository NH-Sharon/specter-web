package com.spectertech.api.repository;

import com.spectertech.api.entity.SiteContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SiteContentRepository extends JpaRepository<SiteContent, Long> {

    Optional<SiteContent> findBySectionKey(String sectionKey);
}
