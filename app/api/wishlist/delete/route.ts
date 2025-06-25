import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  // Extract data from the request body
  const body = await request.json();
  const userId = body.userId;
  const courseId = body.courseId;

  // Validate if userId and courseId are provided
  if (!userId || !courseId) {
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
    // Run your SQL query for deletion
    const [result] = await connection.execute(
      'DELETE FROM wishlist WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    // Close the database connection
    await connection.end();

    // Check if a row was affected, indicating successful deletion
    if (result.affectedRows > 0) {
      return NextResponse.json({ success: true, message: 'Wishlist item deleted successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Wishlist item not found or already deleted' });
    }
  } catch (error) {
    // Handle any errors
    console.error('Error executing query:', error);
    return NextResponse.error();
  }
}
