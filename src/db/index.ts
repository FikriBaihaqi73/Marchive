import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = (typeof import.meta.env !== 'undefined' ? import.meta.env.DATABASE_URL : process.env.DATABASE_URL);

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in your .env file');
}

// Disable prefetch as it is not supported for "transaction" mode if you use things like Supabase
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
