import { NextRequest, NextResponse } from "next/server";
import { invalidateSession } from "@/lib/session";

export async function DELETE(request: NextRequest) {
  try {
    // Get the session token from cookie
    const sessionCookie = request.cookies.get("admin_session");

    // Invalidate session in database if token exists
    if (sessionCookie?.value) {
      await invalidateSession(sessionCookie.value);
    }

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح",
    });

    // Clear the session cookie
    response.cookies.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطأ أثناء تسجيل الخروج",
      },
      { status: 500 },
    );
  }
}
