import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, honeypot } = body;

    // Honeypot check: reject bot submissions quietly
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json({ success: true, message: "Message dispatched." });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 10 characters." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "duncan.dlima@example.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Send via Resend API
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `Portfolio Inquiry from ${name.trim()}`,
          reply_to: email.trim(),
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        }),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error("Resend API error:", errorText);
        return NextResponse.json(
          {
            success: false,
            fallbackMailto: true,
            mailtoUrl: `mailto:${recipientEmail}?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
              name.trim()
            )}&body=${encodeURIComponent(message.trim())}`,
            error: "Email gateway error. Please reach out directly via mailto link.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Thank you. Your message has been received.",
      });
    }

    // No Resend API key configured in env
    const mailtoUrl = `mailto:${recipientEmail}?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
      name.trim()
    )}&body=${encodeURIComponent(`Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`)}`;

    return NextResponse.json({
      success: false,
      fallbackMailto: true,
      mailtoUrl,
      message:
        "Direct email service is not configured with an API key. You can reach out directly via the generated mailto link.",
    });
  } catch (error) {
    console.error("Contact API exception:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing transmission." },
      { status: 500 }
    );
  }
}
