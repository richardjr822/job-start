import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';


export async function POST(request) {
  try {
    // 1. Get job data from request
    const jobData = await request.json();
    const { title, description, location, rate, duration, isUrgent, category } =
      jobData;

    // 2. Validate data
    if (!title || !description || !location || !rate) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Connect to DB
    const client = await clientPromise;
    const db = client.db();
    const jobsCollection = db.collection('jobs');

    // 4. Create the job document
    const newJob = {
      title,
      description,
      location,
      rate,
      duration: duration || null,
      isUrgent: isUrgent || false,
      category: category || 'General',
      postedBy: null,
      createdAt: new Date(),
      status: 'open'
    };

    const result = await jobsCollection.insertOne(newJob);

    return NextResponse.json(
      { message: 'Job posted successfully', jobId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Job post error:', error);
    return NextResponse.json(
      { message: 'An error occurred while posting the job' },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // --- Build Filter Query ---
    const filters = {};
    const category = searchParams.get('category');
    const location = searchParams.get('location'); 
    const q = searchParams.get('q');

    if (category) filters.category = category;
    if (location) filters.location = { $regex: location, $options: 'i' };
    if (q) filters.$text = { $search: q };
    filters.status = 'open';
    // --- End Filter Query ---

    const client = await clientPromise;
    const db = client.db();
    const jobsCollection = db.collection('jobs');

    const jobs = await jobsCollection.find(filters).limit(50).toArray();
    const sortedJobs = jobs.sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json(sortedJobs, { status: 200 });
  } catch (error) {
    console.error('Get jobs error:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching jobs' },
      { status: 500 }
    );
  }
}