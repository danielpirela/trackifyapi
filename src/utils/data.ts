import { parse } from 'csv-parse/sync'
import { join } from 'path'

async function csvToJson(filePath: string) {
    const csvContent = await Bun.file(join(import.meta.dir, filePath)).text()
    return parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        cast: true,
        delimiter: ',',
        quote: '"'
    })
}

// Convertir cada CSV a un objeto JSON
const artists = (await csvToJson('./Artist.csv')).map(artist => ({
    id: artist.id,
    name: artist.name,
    type: artist.type,
    external_urls_spotify: artist.external_urls_spotify || null,
    followers_total: artist.followers_total ? parseInt(artist.followers_total) : null,
    genres: artist.genres ? JSON.parse(artist.genres) : null,
    popularity: artist.popularity ? parseInt(artist.popularity) : null
}))

const albums = (await csvToJson('./Album.csv')).map(album => ({
    id: album.id,
    name: album.name,
    album_type: album.album_type || null,
    total_tracks: album.total_tracks ? parseInt(album.total_tracks) : null,
    external_urls_spotify: album.external_urls_spotify || null,
    release_date: album.release_date ? new Date(album.release_date) : null,
    release_date_precision: album.release_date_precision || null,
    artist_id: album.artist_id
}))

const tracks = (await csvToJson('./Track.csv')).map(track => ({
    id: track.id,
    name: track.name,
    duration_ms: track.duration_ms ? parseInt(track.duration_ms) : null,
    explicit: track.explicit === 'true',
    external_urls_spotify: track.external_urls_spotify || null,
    preview_url: track.preview_url || null,
    track_number: track.track_number ? parseInt(track.track_number) : null,
    album_id: track.album_id || null
}))

const images = (await csvToJson('./Image.csv')).map(image => ({
    id: image.id,
    url: image.url,
    height: image.height ? parseInt(image.height) : null,
    width: image.width ? parseInt(image.width) : null
}))

export { artists, albums, tracks, images }
