import{ createPool } from 'mysql2/promise'

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'trackify',
  port: 3306
}

// Crear pool de conexiones
const db = createPool(dbConfig)

// Función para verificar la conexión
async function testConnection() {
  try {
    const connection = await db.getConnection()
    console.log('Conexión exitosa a la base de datos')
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

export { db }
export { testConnection }
