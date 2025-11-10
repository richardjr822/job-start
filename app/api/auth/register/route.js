import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hash } from 'bcryptjs';
import { USER_ROLES } from '@/constants';

export async function POST(request) {
  try {
    const { email, phone, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    if (!Object.values(USER_ROLES).includes(role)) {
      return NextResponse.json({ message: 'Invalid user role' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 } 
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user
    const result = await usersCollection.insertOne({
      email,
      phone: phone || null, // Phone is optional
      password: hashedPassword,
      role,
      createdAt: new Date(),
      // Add email verification fields
      emailVerified: false,
      emailVerificationToken: crypto.randomUUID(),
    });

    // TODO: Send verification email with the token
    return NextResponse.json(
      {
        message: 'User registered successfully. Please verify your email.',
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}