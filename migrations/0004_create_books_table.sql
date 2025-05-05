CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL,
    publisher_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    isbn TEXT,
    publication_date TEXT NOT NULL,
    cover_url TEXT,
    pages INTEGER NOT NULL,
    language TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime ('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime ('now')),
    deleted_at TEXT
);
