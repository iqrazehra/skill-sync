import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  // Extract user ID from the request query parameters
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
    // Run your SQL query to retrieve wishlist items for the given user ID
    const [rows, fields] = await connection.execute(
      'SELECT courses.course_id, courses.title AS course_title, courses.description, courses.category_id, courses.teacher_id, courses.image_url, courses.video_url, courses.view_count, courses.ratings, teachers.teacher_id AS teacher_id, users_teacher.username AS teacher_name, true AS favorite, CASE WHEN enrolled_courses.course_id IS NOT NULL THEN true ELSE false END AS enrolled FROM wishlist JOIN courses ON wishlist.course_id = courses.course_id JOIN teachers ON courses.teacher_id = teachers.teacher_id JOIN users AS users_teacher ON teachers.user_id = users_teacher.user_id LEFT JOIN enrolled_courses ON courses.course_id = enrolled_courses.course_id AND enrolled_courses.user_id = ? WHERE wishlist.user_id = ?;',
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

export async function POST(request: any) {
  const body = await request.json();

  console.log("Data awaa", body)

  // Extract data from the request body
  const { userId, courseId } = body;

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
      'INSERT INTO wishlist (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
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
