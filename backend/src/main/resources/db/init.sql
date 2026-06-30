-- Docker init script: create DB and user if running fresh container
-- This file is mounted in docker-compose.yml as the postgres initdb script

CREATE DATABASE specterdb;
CREATE USER specter WITH ENCRYPTED PASSWORD 'specterpass';
GRANT ALL PRIVILEGES ON DATABASE specterdb TO specter;
\c specterdb
GRANT ALL ON SCHEMA public TO specter;
