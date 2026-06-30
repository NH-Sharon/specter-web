package com.spectertech.api.repository;

import com.spectertech.api.entity.PortfolioProject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioProjectRepository extends JpaRepository<PortfolioProject, Long> {

    Page<PortfolioProject> findByPublishedTrueOrderByCreatedAtDesc(Pageable pageable);
}
