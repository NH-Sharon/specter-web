package com.spectertech.api.service;

import com.spectertech.api.dto.PortfolioProjectDto;
import com.spectertech.api.entity.PortfolioProject;
import com.spectertech.api.exception.NotFoundException;
import com.spectertech.api.repository.PortfolioProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PortfolioService {

    private final PortfolioProjectRepository portfolioProjectRepository;

    public Page<PortfolioProject> findAll(int page, int size) {
        return portfolioProjectRepository.findAll(
            PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public Page<PortfolioProject> findPublished(int page, int size) {
        return portfolioProjectRepository.findByPublishedTrueOrderByCreatedAtDesc(
            PageRequest.of(page, size));
    }

    public PortfolioProject findById(Long id) {
        return portfolioProjectRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Portfolio project not found with id: " + id));
    }

    @Transactional
    public PortfolioProject create(PortfolioProjectDto dto) {
        PortfolioProject project = PortfolioProject.builder()
            .title(dto.title())
            .client(dto.client())
            .category(dto.category())
            .description(dto.description())
            .technologies(dto.technologies())
            .metrics(dto.metrics())
            .year(dto.year())
            .featured(dto.featured())
            .published(dto.published())
            .build();
        return portfolioProjectRepository.save(project);
    }

    @Transactional
    public PortfolioProject update(Long id, PortfolioProjectDto dto) {
        PortfolioProject project = findById(id);
        project.setTitle(dto.title());
        project.setClient(dto.client());
        project.setCategory(dto.category());
        project.setDescription(dto.description());
        project.setTechnologies(dto.technologies());
        project.setMetrics(dto.metrics());
        project.setYear(dto.year());
        project.setFeatured(dto.featured());
        project.setPublished(dto.published());
        return portfolioProjectRepository.save(project);
    }

    @Transactional
    public void delete(Long id) {
        if (!portfolioProjectRepository.existsById(id)) {
            throw new NotFoundException("Portfolio project not found with id: " + id);
        }
        portfolioProjectRepository.deleteById(id);
        log.info("Deleted portfolio project id: {}", id);
    }
}
