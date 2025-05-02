CREATE TABLE IF NOT EXISTS authors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    biography TEXT,
    birth_date TEXT NOT NULL,
    death_date TEXT,
    nationality TEXT,
    photo_url TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT
);
