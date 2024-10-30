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
        const body = await c.req.json()

        // Validar que el body contenga los datos necesarios
        if (!body.artists && !body.albums && !body.tracks && !body.images) {
            return c.json({ error: 'Debe proporcionar al menos un tipo de dato para importar' }, 400)
        }

        // Importar artistas si existen en el body
        if (body.artists && Array.isArray(body.artists)) {
            for (const artist of body.artists) {
                await db.query(
                    'INSERT INTO Artist (id, name, type, external_urls_spotify, followers_total, genres, popularity) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [
                        artist.id,
                        artist.name,
                        artist.type,
                        artist.external_urls_spotify,
                        artist.followers_total,
                        JSON.stringify(artist.genres),
                        artist.popularity
                    ]
                )
            }
        }

        // Importar álbumes si existen en el body
        if (body.albums && Array.isArray(body.albums)) {
            for (const album of body.albums) {
                await db.query(
                    'INSERT INTO Album (id, name, album_type, total_tracks, external_urls_spotify, release_date, release_date_precision, artist_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        album.id,
                        album.name,
                        album.album_type,
                        album.total_tracks,
                        album.external_urls_spotify,
                        album.release_date ? new Date(album.release_date) : null,
                        album.release_date_precision,
                        album.artist_id
                    ]
                )
            }
        }

        // Importar imágenes si existen en el body
        if (body.images && Array.isArray(body.images)) {
            for (const image of body.images) {
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
        }

        // Importar tracks si existen en el body
        if (body.tracks && Array.isArray(body.tracks)) {
            for (const track of body.tracks) {
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
        }

        return c.json({ message: 'Datos guardados exitosamente' })
    } catch (error) {
        console.error('Error al guardar datos:', error)
        return c.json({ error: 'Error al guardar datos' }, 500)
    }
})



export default app
