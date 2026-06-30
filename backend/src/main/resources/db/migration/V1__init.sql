-- Specter Technologies initial schema

CREATE TABLE IF NOT EXISTS contact_inquiries (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100),
    budget VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_created ON contact_inquiries(created_at DESC);

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(active);
