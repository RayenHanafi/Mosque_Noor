import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check for admin session cookie
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie || sessionCookie.value !== "authenticated") {
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
