import pool from "../db/config";

export async function GET() {
    try {

        const { rows } = await pool.query('SELECT * FROM test');
        console.log('rows:', rows);
        if (rows.length > 0) {
            console.log('Connection successful:', rows);
           
            return new Response(JSON.stringify(rows), { status: 200 });
        } else {
            return new Response('Test table is empty.', { status: 200 });
        }
    } catch (error) {
        console.error('Database connection failed:', error);
        return new Response('Database connection failed.', { status: 500 });
    }
}
