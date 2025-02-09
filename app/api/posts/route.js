import pool from '../../db/config.js';
export default async function handler(req, res) {
    if (req.method === "GET") {
      try {
        const { rows } = await pool.query("SELECT * FROM posts ORDER BY created_date DESC");
        return res.status(200).json(rows);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
}