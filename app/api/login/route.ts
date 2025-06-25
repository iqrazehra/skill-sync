// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// Create a MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'iqra110',
  database: 'skill-sync',
};

// Helper function to compare passwords using bcrypt
const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// Login API endpoint
export async function POST(request: NextRequest) {
  try {
    // Extract data from the request body
    const { email, password } = await request.json();

    // Create a MySQL connection
    const connection = await mysql.createConnection(dbConfig);

    // Run SQL query to get user details based on email
    const [rows] = await connection.execute(
      'SELECT user_id, username, password, role FROM users WHERE email = ?',
      [email]
    );

    // Check if a user with the provided email exists
    if (rows.length === 0) {
      return NextResponse.error();
    }

    // Verify the provided password against the hashed password
    const user = rows[0];
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return NextResponse.error();
    }

    // Return user details (excluding password) upon successful login
    if (user.role === 'teacher') {
      user.user_id = await getTeacherData(user.user_id, connection)
    }
    const { user_id, username, role } = user;
    console.log("TeacherID", user);
    return NextResponse.json({ user_id, username, role });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.error();
  }
}

async function getTeacherData(userId: string, connection: any) {
  try {
    // Run SQL query to get user details based on email
    const [rows] = await connection.execute(
      'SELECT teacher_id FROM teachers WHERE user_id = ?;',
      [userId]
    );

    // Check if a user with the provided email exists
    if (rows.length === 0) {
      return userId;
    }

    console.log("Teacher", rows);

    // Verify the provided password against the hashed password
    const user = rows[0];

    // Return user details (excluding password) upon successful login
    const { teacher_id } = user;

    return teacher_id;
  } catch (error) {
    console.error('Error getting teacher record:', error);
    return userId;
  }
}
