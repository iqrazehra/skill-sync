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
    ('SELECT courses.course_id, courses.title AS course_title, courses.description, courses.category_id, courses.teacher_id, courses.image_url, courses.video_url, courses.view_count, courses.ratings, teachers.teacher_id AS teacher_id, users.username AS teacher_name from courses join teachers ON courses.teacher_id = teachers.teacher_id join users on users.user_id=teachers.user_id where teachers.teacher_id=?;',
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
