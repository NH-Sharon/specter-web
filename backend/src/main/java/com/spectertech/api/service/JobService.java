package com.spectertech.api.service;

import com.spectertech.api.dto.JobPostingDto;
import com.spectertech.api.entity.JobPosting;
import com.spectertech.api.exception.NotFoundException;
import com.spectertech.api.repository.JobPostingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobService {

    private final JobPostingRepository jobPostingRepository;

    public Page<JobPosting> findAll(int page, int size) {
        return jobPostingRepository.findAll(
            PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public List<JobPosting> findActive() {
        return jobPostingRepository.findByActiveTrueOrderByCreatedAtDesc();
    }

    public JobPosting findById(Long id) {
        return jobPostingRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Job posting not found with id: " + id));
    }

    @Transactional
    public JobPosting create(JobPostingDto dto) {
        JobPosting job = JobPosting.builder()
            .title(dto.title())
            .department(dto.department())
            .location(dto.location())
            .type(dto.type())
            .level(dto.level())
            .description(dto.description())
            .requirements(dto.requirements())
            .responsibilities(dto.responsibilities())
            .salaryRange(dto.salaryRange())
            .active(dto.active())
            .build();
        return jobPostingRepository.save(job);
    }

    @Transactional
    public JobPosting update(Long id, JobPostingDto dto) {
        JobPosting job = findById(id);
        job.setTitle(dto.title());
        job.setDepartment(dto.department());
        job.setLocation(dto.location());
        job.setType(dto.type());
        job.setLevel(dto.level());
        job.setDescription(dto.description());
        job.setRequirements(dto.requirements());
        job.setResponsibilities(dto.responsibilities());
        job.setSalaryRange(dto.salaryRange());
        job.setActive(dto.active());
        return jobPostingRepository.save(job);
    }

    @Transactional
    public void delete(Long id) {
        if (!jobPostingRepository.existsById(id)) {
            throw new NotFoundException("Job posting not found with id: " + id);
        }
        jobPostingRepository.deleteById(id);
        log.info("Deleted job posting id: {}", id);
    }

    @Transactional
    public JobPosting toggleActive(Long id) {
        JobPosting job = findById(id);
        job.setActive(!job.isActive());
        return jobPostingRepository.save(job);
    }
}
