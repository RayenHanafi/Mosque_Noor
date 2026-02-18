import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, validateSession } from "@/lib/session";

// GET /api/admin/settings — fetch admin settings (public read)
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("admin_settings")
      .select("*")
      .single();

    if (error) {
      console.error("Fetch settings error:", error);
      return NextResponse.json(
        { success: false, message: "حدث خطأ أثناء جلب الإعدادات" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { success: false, message: "خطأ في الخادم" },
      { status: 500 },
    );
  }
}

// PUT /api/admin/settings — update admin settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Verify admin session
    const sessionCookie = request.cookies.get("admin_session");
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: "غير مسجل الدخول" },
        { status: 401 },
      );
    }

    const session = await validateSession(sessionCookie.value);
    if (!session.valid) {
      return NextResponse.json(
        { success: false, message: "جلسة غير صالحة" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { id, phone, email, jummah_time } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "معرف الإعدادات مطلوب" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseServer
      .from("admin_settings")
      .update({
        phone,
        email,
        jummah_time,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update settings error:", error);
      return NextResponse.json(
        { success: false, message: "حدث خطأ أثناء حفظ الإعدادات" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { success: false, message: "خطأ في الخادم" },
      { status: 500 },
    );
  }
}
