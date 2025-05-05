CREATE TABLE IF NOT EXISTS genres (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime ('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime ('now')),
    deleted_at TEXT
);
