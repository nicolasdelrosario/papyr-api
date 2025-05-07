CREATE TABLE IF NOT EXISTS book_genres (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    genre_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    deleted_at TEXT,
 
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);