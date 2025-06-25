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
    ('SELECT courses.course_id, courses.title AS course_title, courses.description, courses.category_id, courses.teacher_id, courses.image_url, courses.video_url, courses.view_count, courses.ratings, teachers.teacher_id AS teacher_id, users.username AS teacher_name, CASE WHEN wishlist.course_id IS NOT NULL THEN true ELSE false END AS favorite, CASE WHEN enrolled_courses.course_id IS NOT NULL THEN true ELSE false END AS enrolled FROM courses JOIN teachers ON courses.teacher_id = teachers.teacher_id JOIN users ON teachers.user_id = users.user_id LEFT JOIN wishlist ON courses.course_id = wishlist.course_id AND wishlist.user_id = ? LEFT JOIN enrolled_courses ON courses.course_id = enrolled_courses.course_id AND enrolled_courses.user_id = ? ORDER BY courses.course_id DESC limit 4;',
    [userId, userId]
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
