export interface Artist {
    id: string;
    name: string;
    type: string;
    external_urls_spotify: string | null;
    followers_total: number | null;
    genres: string[] | null;
    popularity: number | null;
}

export interface Album {
    id: string;
    name: string;
    album_type: string | null;
    total_tracks: number | null;
    external_urls_spotify: string | null;
    release_date: Date | null;
    release_date_precision: string | null;
    artist_id: string;
}

export interface Image {
    id: string;
    url: string;
    height: number | null;
    width: number | null;
}

export interface Track {
    id: string;
    name: string;
    duration_ms: number | null;
    explicit: boolean | null;
    external_urls_spotify: string | null;
    preview_url: string | null;
    track_number: number | null;
    album_id: string;
}
