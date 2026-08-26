import pg from 'pg';
import 'dotenv/config';

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

client.connect()
  .then(() => {
    console.log(' Conexión exitosa con el driver pg');
    return client.end();
  })
  .catch((err) => {
    console.error(' Error de conexión:', err.message);
  });