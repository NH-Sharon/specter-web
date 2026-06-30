package com.spectertech.api.repository;

import com.spectertech.api.entity.ContactInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Long> {}
