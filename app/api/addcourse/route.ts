import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: any) {
  const body = await request.json();

  console.log("Data awaa", body)

  // Extract data from the request body
  // title: '',
  //       description: '',
  //       category_id: '',
  //       teacher_id: '',
  //       imageUrl: '',
  //       videoUrl: '',
  //       viewCount: 0,
  //       ratings: 0.0,
  const { title, description, category, teacher, imageUrl, videoUrl, viewCount, ratings } = body;

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
      'INSERT INTO courses (title, description, category_id, teacher_id, image_url, video_url, view_count, ratings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, category, teacher, imageUrl, videoUrl, viewCount, ratings]
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
