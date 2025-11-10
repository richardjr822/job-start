import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hash } from 'bcryptjs';
import { USER_ROLES } from '@/constants';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phone: z.string().min(10, { message: "Invalid phone number" }).optional().or(z.literal('')),
  role: z.enum(Object.values(USER_ROLES), {
    message: "Invalid user role",
  }),
});

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or missing JSON body" },
        { status: 400 }
      );
    }

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, phone, role } = validation.data;

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

    const hashedPassword = await hash(password, 10);

    const result = await usersCollection.insertOne({
      email,
      phone: phone || null,
      passwordHash: hashedPassword,
      role,
      createdAt: new Date(),
      emailVerified: true,
    });

    return NextResponse.json(
      {
        message: 'User registered successfully.',
        userId: result.insertedId,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}