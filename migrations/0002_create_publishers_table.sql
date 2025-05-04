CREATE TABLE IF NOT EXISTS publishers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    website_url TEXT,
    founded_year TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime ('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime ('now')),
    deleted_at TEXT
);
