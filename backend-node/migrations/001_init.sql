-- Contact inquiries
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  phone       VARCHAR(30),
  company     VARCHAR(100),
  subject     VARCHAR(255)  NOT NULL,
  message     TEXT          NOT NULL,
  service     VARCHAR(100),
  budget      VARCHAR(50),
  status      VARCHAR(30)   NOT NULL DEFAULT 'NEW',
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id           BIGSERIAL PRIMARY KEY,
  email        VARCHAR(150) NOT NULL UNIQUE,
  subscribed   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id          BIGSERIAL PRIMARY KEY,
  username    VARCHAR(50)  NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  full_name   VARCHAR(100) NOT NULL,
  role        VARCHAR(20)  NOT NULL DEFAULT 'ADMIN',
  active      BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id           BIGSERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  slug         VARCHAR(255) NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT         NOT NULL,
  category     VARCHAR(100),
  tags         VARCHAR(500),
  author       VARCHAR(100) DEFAULT 'Specter Technologies',
  cover_image  VARCHAR(500),
  published    BOOLEAN      NOT NULL DEFAULT FALSE,
  featured     BOOLEAN      NOT NULL DEFAULT FALSE,
  read_time    VARCHAR(20)  DEFAULT '5 min read',
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Portfolio projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id           BIGSERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  client       VARCHAR(100),
  category     VARCHAR(100),
  description  TEXT,
  technologies VARCHAR(500),
  metrics      TEXT,
  year         VARCHAR(10),
  featured     BOOLEAN      NOT NULL DEFAULT FALSE,
  published    BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Job postings
CREATE TABLE IF NOT EXISTS job_postings (
  id               BIGSERIAL PRIMARY KEY,
  title            VARCHAR(255) NOT NULL,
  department       VARCHAR(100),
  location         VARCHAR(100),
  type             VARCHAR(50),
  level            VARCHAR(50),
  description      TEXT,
  requirements     TEXT,
  responsibilities TEXT,
  salary_range     VARCHAR(100),
  active           BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Site content (JSON key-value store)
CREATE TABLE IF NOT EXISTS site_content (
  id           BIGSERIAL PRIMARY KEY,
  section_key  VARCHAR(100) NOT NULL UNIQUE,
  content_json TEXT         NOT NULL,
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Default admin (password: Admin@123)
INSERT INTO admin_users (username, password, full_name, role)
VALUES ('admin', '$2a$12$Mxl5BAEuTwI3QYVkBu3xSeCBJspc1h9PpF3sLlnbYlbNp1eC5vIzK', 'Specter Admin', 'ADMIN')
ON CONFLICT (username) DO NOTHING;
