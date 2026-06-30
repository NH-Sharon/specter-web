package com.spectertech.api.service;

import com.spectertech.api.dto.SiteContentDto;
import com.spectertech.api.entity.SiteContent;
import com.spectertech.api.exception.NotFoundException;
import com.spectertech.api.repository.SiteContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContentService {

    private final SiteContentRepository siteContentRepository;

    public List<SiteContent> findAll() {
        return siteContentRepository.findAll();
    }

    public SiteContent findByKey(String key) {
        return siteContentRepository.findBySectionKey(key)
            .orElseThrow(() -> new NotFoundException("Content section not found: " + key));
    }

    @Transactional
    public SiteContent upsert(String key, SiteContentDto dto) {
        SiteContent content = siteContentRepository.findBySectionKey(key)
            .orElse(SiteContent.builder().sectionKey(key).build());
        content.setContentJson(dto.contentJson());
        log.info("Upserting site content for key: {}", key);
        return siteContentRepository.save(content);
    }
}
