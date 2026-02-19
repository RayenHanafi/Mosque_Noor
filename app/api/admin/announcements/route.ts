import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, validateSession } from "@/lib/session";

// GET /api/admin/announcements — fetch all announcements (public read)
export async function GET() {
  try {
    // Auto-delete expired announcements (those with a date before today)
    // Announcements without a date are kept until manually deleted
    await supabaseServer
      .from("announcements")
      .delete()
      .not("date", "is", null)
      .lt("date", new Date().toISOString().split("T")[0]);

    const { data, error } = await supabaseServer
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch announcements error:", error);
      return NextResponse.json(
        { success: false, message: "حدث خطأ أثناء جلب الإعلانات" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error("Announcements GET error:", error);
    return NextResponse.json(
      { success: false, message: "خطأ في الخادم" },
      { status: 500 },
    );
  }
}

// POST /api/admin/announcements — add a new announcement (admin only)
export async function POST(request: NextRequest) {
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
    const { title, description, date, time } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "عنوان الإعلان مطلوب" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseServer
      .from("announcements")
      .insert([
        {
          title,
          description: description || null,
          date: date || null,
          time: time || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Add announcement error:", error);
      return NextResponse.json(
        { success: false, message: "حدث خطأ أثناء إضافة الإعلان" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Announcements POST error:", error);
    return NextResponse.json(
      { success: false, message: "خطأ في الخادم" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/announcements — delete an announcement (admin only)
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "معرف الإعلان مطلوب" },
        { status: 400 },
      );
    }

    const { error } = await supabaseServer
      .from("announcements")
      .delete()
      .eq("id", parseInt(id));

    if (error) {
      console.error("Delete announcement error:", error);
      return NextResponse.json(
        { success: false, message: "حدث خطأ أثناء حذف الإعلان" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Announcements DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "خطأ في الخادم" },
      { status: 500 },
    );
  }
}
