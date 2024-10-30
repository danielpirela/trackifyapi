CREATE TABLE Artist (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    external_urls_spotify VARCHAR(255),
    followers_total INTEGER,
    genres JSON,
    popularity INTEGER
);

CREATE TABLE Album (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    album_type VARCHAR(50),
    total_tracks INTEGER,
    external_urls_spotify VARCHAR(255),
    release_date DATE,
    release_date_precision VARCHAR(50),
    artist_id VARCHAR(255),
    FOREIGN KEY (artist_id) REFERENCES Artist(id)
);

CREATE TABLE Image (
    id VARCHAR(255) PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    height INTEGER,
    width INTEGER
);

CREATE TABLE Track (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_ms INTEGER,
    explicit BOOLEAN,
    external_urls_spotify VARCHAR(255),
    preview_url VARCHAR(255),
    track_number INTEGER,
    album_id VARCHAR(255),
    FOREIGN KEY (album_id) REFERENCES Album(id)
);

