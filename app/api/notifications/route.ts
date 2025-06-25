import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  // Validate if userId is provided
  if (!userId) {
    return NextResponse.error();
  }
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
    ('SELECT * from notifications where user_id = ? order by notification_id Desc;',
    [userId]
    );

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
