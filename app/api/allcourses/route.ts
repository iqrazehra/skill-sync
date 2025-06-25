import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId');
  const category = searchParams.get('category'); // Get category from search params

  if (!userId) {
    return NextResponse.error();
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iqra110',
    database: 'skill-sync',
  });

  try {
    let query = `SELECT courses.course_id, courses.title AS course_title, courses.description, courses.category_id, courses.teacher_id, courses.image_url, courses.video_url, courses.view_count, courses.ratings, teachers.teacher_id AS teacher_id, users.username AS teacher_name, CASE WHEN wishlist.course_id IS NOT NULL THEN true ELSE false END AS favorite, CASE WHEN enrolled_courses.course_id IS NOT NULL THEN true ELSE false END AS enrolled FROM courses JOIN teachers ON courses.teacher_id = teachers.teacher_id JOIN users ON teachers.user_id = users.user_id LEFT JOIN wishlist ON courses.course_id = wishlist.course_id AND wishlist.user_id = ? LEFT JOIN enrolled_courses ON courses.course_id = enrolled_courses.course_id AND enrolled_courses.user_id = ?`;

    const params = [userId, userId]; // Initialize parameters array

    // Conditionally add category filtering
    if (category) {
      query += ` WHERE courses.category_id = ?`;
      params.push(category);
    }

    const [rows] = await connection.execute(query, params);

    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.error();
  }
}

