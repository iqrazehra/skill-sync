import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  // Create a MySQL connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iqra110',
    database: 'skill-sync',
  });

  try {
    // Run your SQL query
    const [rows, fields] = await connection.execute
    ('SELECT * from categories;');

    console.log('Yayaa', rows);

    // Close the database connection
    await connection.end();

    // Return the result as JSON
    return NextResponse.json(rows);
  } catch (error) {
    // Handle any errors
    console.error('Error executing query:', error);
    return NextResponse.error();
  }
}
