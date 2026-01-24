import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    // Check for admin session cookie
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "غير مسجل الدخول",
        },
        { status: 401 },
      );
    }

    // Validate session token against database
    const session = await validateSession(sessionCookie.value);

    if (!session.valid) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "غير مسجل الدخول",
        },
        { status: 401 },
      );
    }

    // Session is valid
    return NextResponse.json({
      authenticated: true,
      message: "مسجل الدخول",
      user: {
        id: session.adminId,
        username: session.username,
      },
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      {
        authenticated: false,
        message: "خطأ في التحقق من الجلسة",
      },
      { status: 500 },
    );
  }
}
