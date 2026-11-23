import { NextResponse } from 'next/server';

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, vehicleMake, vehicleModel, services, message, honeypot } = body;

    // 1. Honeypot check (spam bots fill this hidden field)
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 }); // Silent drop
    }

    // 2. Rate limiting check (lenient 2s debounce for customer testing)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'local';
    const lastTime = rateLimitMap.get(ip) || 0;
    const now = Date.now();

    if (now - lastTime < 2000) {
      return NextResponse.json(
        { error: 'Please wait a moment before sending another enquiry.' },
        { status: 429 }
      );
    }

    // 3. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Valid name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 15) {
      return NextResponse.json({ error: 'Message must be at least 15 characters.' }, { status: 400 });
    }

    rateLimitMap.set(ip, now);

    // In production, integrate email service (Resend, SendGrid, Postmark) here:
    // await sendEmail({ to: 'hello@apexautomotive.co.uk', from: email, subject: ... });

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully. Our studio team will be in touch shortly.',
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing enquiry.' },
      { status: 500 }
    );
  }
}
