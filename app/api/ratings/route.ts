import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: any) {
  const body = await request.json();
  const { userId, courseId, ratings } = body;

  // Create a MySQL connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iqra110',
    database: 'skill-sync',
  });

  try {
    // Run your SQL query for insertion
    const [result] = await connection.execute(
      'INSERT INTO ratings (user_id, course_id, value) VALUES (?, ?, ?)',
      [userId, courseId, ratings]
    );

    // Close the database connection
    await connection.end();

    // Return the result of the insertion
    return NextResponse.json({ success: true, insertId: result.insertId });
  } catch (error) {
    // Handle any errors
    console.error('Error executing query:', error);
    return NextResponse.error();
  }
}
