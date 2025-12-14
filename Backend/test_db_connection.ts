import mariadb from 'mariadb';
import 'dotenv/config';

async function testConnection() {
  const pool = mariadb.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
  });

  try {
    console.log("Attempting to connect to database...");
    console.log(`Host: ${process.env.DATABASE_HOST}`);
    console.log(`User: ${process.env.DATABASE_USER}`);
    console.log(`Database: ${process.env.DATABASE_NAME}`);
    
    const conn = await pool.getConnection();
    console.log("✅ Successfully connected to database!");
    console.log("Connection ID:", conn.threadId);
    conn.release(); // release to pool
  } catch (err) {
    console.error("❌ Failed to connect to database:");
    console.error(err);
  } finally {
    await pool.end();
  }
}

testConnection();
