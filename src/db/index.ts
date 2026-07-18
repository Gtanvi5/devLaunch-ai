import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// This URL will come from your .env.local file
const sql = neon(process.env.DATABASE_URL!);

// We pass the schema in so we get type inference across the app
export const db = drizzle(sql, { schema });
