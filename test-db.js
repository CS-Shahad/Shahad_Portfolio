import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: "postgresql://postgres:Ss%4023456789@db.ygcqdbeccdvdofdkzhnu.supabase.co:5432/postgres?sslmode=require"
});

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Database connection successful!");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    await client.end();
  }
}

testConnection();
