CREATE SEQUENCE IF NOT EXISTS hibernate_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE maltokens
(
    user_id       UUID NOT NULL,
    created_at    TIMESTAMP with time zone,
    updated_at    TIMESTAMP with time zone,
    mal_id        INTEGER,
    refresh_token TEXT,
    access_token  TEXT,
    CONSTRAINT pk_maltokens PRIMARY KEY (user_id)
);

CREATE TABLE users
(
    id            UUID NOT NULL,
    created_at    TIMESTAMP with time zone,
    updated_at    TIMESTAMP with time zone,
    username      VARCHAR(255),
    email         VARCHAR(255),
    password      VARCHAR(255),
    token_version INTEGER,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE maltokens
    ADD CONSTRAINT uc_maltokens_malid UNIQUE (mal_id);

ALTER TABLE users
    ADD CONSTRAINT uc_users_email UNIQUE (email);

ALTER TABLE users
    ADD CONSTRAINT uc_users_username UNIQUE (username);

ALTER TABLE maltokens
    ADD CONSTRAINT FK_MALTOKENS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);