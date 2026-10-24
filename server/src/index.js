import "dotenv/config";
import pg from "pg";
import express from "express";

const app = express();
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

app.get("/health", async (req, res) => {
    try {
        await client.query("SELECT 1");
        res.status(200).send({ ok: true, db: true });
    } catch (error) {
        res.status(500).send({ db: false });
    }
});

const client = await pool.connect().then(
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
).catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
});