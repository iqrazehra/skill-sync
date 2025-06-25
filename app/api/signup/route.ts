// route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: any) {
  const body = await request.json();

  console.log("Received signup data", body);

  // Extract user data from the request body
  const { username, email, password, role,biography,experience_years } = body;

  // Connection details for the MySQL database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iqra110',
    database: 'skill-sync',
  });

  try {
    // Begin transaction
    await connection.beginTransaction();

    // SQL query to insert the new user's data into users table
    const [userResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO users (username, email, password, role) 
      VALUES (?, ?, ?, ?)`,
      [username, email, password, role]
    );

    // If the role is 'student', insert academic records as well
    if (role === 'teacher') {
      const [recordResult] = await connection.execute<ResultSetHeader>(
        `INSERT INTO teachers (user_id, biography, experience_years) 
        VALUES (?, ?, ?)`,
        [userResult.insertId,biography,experience_years]
      );
    }

    // Commit transaction
    await connection.commit();

    // Close the database connection
    await connection.end();

    // Respond with a JSON object indicating success and the new user's ID
    return NextResponse.json({ success: true, userId: userResult.insertId });
  } catch (error) {
    // Rollback transaction in case of error
    await connection.rollback();

    console.error('Error executing query:', error);
    // Respond with an error message
    return NextResponse.rewrite(new URL('/error', request.url));  // Redirect to an error page or handle as needed
  }
}
