import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, type, message } = await request.json();

  // TODO: wire up to Resend / Nodemailer / Formspree
  console.log("[contact]", { name, email, type, message });

  return NextResponse.json({ ok: true });
}
