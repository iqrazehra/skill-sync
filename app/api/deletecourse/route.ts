import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  console.log("hi",courseId);
  // Validate if courseId is provided
  if (!courseId) {
    return new Response("Course ID is required", { status: 400 });
  }

  // Create a MySQL connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iqra110',
    database: 'skill-sync',
  });

  try {
    // Start a transaction
    await connection.beginTransaction();
    console.log(courseId);
    // Delete from dependent tables first if not using CASCADE
    await connection.execute('DELETE FROM wishlist WHERE course_id = ?', [courseId]);
    await connection.execute('DELETE FROM enrolled_courses WHERE course_id = ?', [courseId]);

    // Then delete the course itself
    const [result] = await connection.execute('DELETE FROM courses WHERE course_id = ?', [courseId]);

    // Commit transaction
    await connection.commit();

    // Close the database connection
    await connection.end();

    // Check if the course was actually deleted
    if (result.affectedRows === 0) {
      return new Response("No course found with the given ID", { status: 404 });
    }

    // Return a success response
    return new Response("Course deleted successfully", { status: 200 });
  } catch (error) {
    // If error, rollback the transaction
    await connection.rollback();

    // Close the database connection
    await connection.end();

    // Handle any errors
    console.error('Error executing query:', error);
    return new Response("Internal server error", { status: 500 });
  }
}
