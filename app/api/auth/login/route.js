export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: 'Invalid or missing JSON body' }, { status: 400 });
  }

  const { email, password } = body || {};

  if (!email || !password) {
    return Response.json({ message: 'Email and password required' }, { status: 400 });
  }

  return Response.json({
    message: 'Login successful',
    user: { email },
  });
}