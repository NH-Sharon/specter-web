package com.spectertech.api.service;

import com.spectertech.api.dto.ContactRequest;
import com.spectertech.api.entity.ContactInquiry;
import com.spectertech.api.repository.ContactInquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactInquiryRepository repository;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${mail.contact-recipient:contact@spectertech.com.bd}")
    private String contactRecipient;

    @Transactional
    public void processContact(ContactRequest request) {
        ContactInquiry inquiry = ContactInquiry.builder()
            .name(request.name())
            .email(request.email())
            .company(request.company())
            .phone(request.phone())
            .service(request.service())
            .budget(request.budget())
            .message(request.message())
            .build();

        repository.save(inquiry);
        sendNotificationEmail(inquiry);
        sendAutoReplyEmail(request.email(), request.name());
    }

    @Async
    protected void sendNotificationEmail(ContactInquiry inquiry) {
        if (fromEmail == null || fromEmail.isBlank()) return;
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(fromEmail);
            msg.setTo(contactRecipient);
            msg.setSubject("New Contact Inquiry from " + inquiry.getCompany());
            msg.setText(buildNotificationBody(inquiry));
            mailSender.send(msg);
        } catch (Exception e) {
            log.warn("Failed to send notification email: {}", e.getMessage());
        }
    }

    @Async
    protected void sendAutoReplyEmail(String toEmail, String name) {
        if (fromEmail == null || fromEmail.isBlank()) return;
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(fromEmail);
            msg.setTo(toEmail);
            msg.setSubject("Thank you for contacting Specter Technologies");
            msg.setText(buildAutoReplyBody(name));
            mailSender.send(msg);
        } catch (Exception e) {
            log.warn("Failed to send auto-reply email: {}", e.getMessage());
        }
    }

    private String buildNotificationBody(ContactInquiry i) {
        return String.format("""
            New Contact Inquiry
            -------------------
            Name:    %s
            Email:   %s
            Company: %s
            Phone:   %s
            Service: %s
            Budget:  %s

            Message:
            %s
            """, i.getName(), i.getEmail(), i.getCompany(),
            orNa(i.getPhone()), orNa(i.getService()), orNa(i.getBudget()), i.getMessage());
    }

    private String buildAutoReplyBody(String name) {
        return String.format("""
            Dear %s,

            Thank you for reaching out to Specter Technologies. We have received your inquiry
            and our team will review it promptly.

            You can expect a response from us within 24 business hours.

            In the meantime, feel free to explore our services at https://spectertech.com.bd

            Best regards,
            The Specter Technologies Team
            """, name);
    }

    private String orNa(String value) {
        return (value != null && !value.isBlank()) ? value : "N/A";
    }
}
