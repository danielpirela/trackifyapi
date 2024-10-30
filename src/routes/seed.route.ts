import { Context, Hono } from 'hono'
import { db } from '../services/db'
import { artists, albums, tracks, images } from '../utils/data'

const app = new Hono()

app.get('/', async (c: Context) => {
    try {
        const [rows] = await db.query('SELECT * FROM Artist')
        return c.json(rows)
    } catch (error) {
        console.error('Error al obtener artistas:', error)
        return c.json({ error: 'Error al obtener artistas' }, 500)
    }
})

app.post('/', async (c: Context) => {
    try {
        // Importar artistas
        for (const artist of artists) {
            await db.query(
                'INSERT INTO Artist (id, name, type, external_urls_spotify, followers_total, genres, popularity) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    artist.id,
                    artist.name,
                    artist.type,
                    artist.external_urls_spotify,
                    artist.followers_total,
                    JSON.stringify(artist.genres), // Convertir el array a string JSON
                    artist.popularity
                ]
            )
        }

        // Importar álbumes
        for (const album of albums) {
            await db.query(
                'INSERT INTO Album (id, name, album_type, total_tracks, external_urls_spotify, release_date, release_date_precision, artist_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    album.id,
                    album.name,
                    album.album_type,
                    album.total_tracks,
                    album.external_urls_spotify,
                    album.release_date,
                    album.release_date_precision,
                    album.artist_id
                ]
            )
        }

        // Importar imágenes
        for (const image of images) {
            await db.query(
                'INSERT INTO Image (id, url, height, width) VALUES (?, ?, ?, ?)',
                [
                    image.id,
                    image.url,
                    image.height,
                    image.width
                ]
            )
        }

        // Importar tracks
        for (const track of tracks) {
            await db.query(
                'INSERT INTO Track (id, name, duration_ms, explicit, external_urls_spotify, preview_url, track_number, album_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    track.id,
                    track.name,
                    track.duration_ms,
                    track.explicit,
                    track.external_urls_spotify,
                    track.preview_url,
                    track.track_number,
                    track.album_id
                ]
            )
        }

        return c.json({ message: 'Datos importados exitosamente' })
    } catch (error) {
        console.error('Error al importar datos:', error)
        return c.json({ error: 'Error al importar datos' }, 500)
    }
})

export default app
