package com.spectertech.api.service;

import com.spectertech.api.entity.ContactInquiry;
import com.spectertech.api.exception.NotFoundException;
import com.spectertech.api.repository.ContactInquiryRepository;
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
public class InquiryService {

    private final ContactInquiryRepository contactInquiryRepository;

    public Page<ContactInquiry> findAll(int page, int size) {
        return contactInquiryRepository.findAll(
            PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public ContactInquiry findById(Long id) {
        return contactInquiryRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Inquiry not found with id: " + id));
    }

    @Transactional
    public ContactInquiry updateStatus(Long id, String status) {
        ContactInquiry inquiry = findById(id);
        ContactInquiry.InquiryStatus newStatus = ContactInquiry.InquiryStatus.valueOf(status.toUpperCase());
        inquiry.setStatus(newStatus);
        log.info("Updated inquiry {} status to {}", id, newStatus);
        return contactInquiryRepository.save(inquiry);
    }
}
