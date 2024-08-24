// redisClient.js
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379', // Cambia la URL si Redis no está en localhost
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

export default redisClient;
