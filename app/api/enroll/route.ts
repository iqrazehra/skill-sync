import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: any) {
    const body = await request.json();
  
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
      // Start the transaction
      await connection.beginTransaction();
  
      // Run your SQL queries for insertion
      await connection.execute(
        'INSERT INTO enrolled_courses (user_id, course_id) VALUES (?, ?)',
        [userId, courseId]
      );

      await connection.execute(
        'UPDATE courses SET view_count = view_count + 1 WHERE course_id = ?',
        [courseId]
      );

      await connection.execute(
        'INSERT INTO wishlist (user_id, course_id) VALUES (?, ?)',
        [userId, courseId]
      );
  
      // Commit the transaction
      await connection.commit();
  
      // Close the database connection
      await connection.end();
  
      // Return the result of the insertion
      return NextResponse.json({ success: true });
    } catch (error) {
      // Rollback the transaction in case of an error
      await connection.rollback();
      
      // Handle any errors
      console.error('Error executing query:', error);
      return NextResponse.error();
    }
}
