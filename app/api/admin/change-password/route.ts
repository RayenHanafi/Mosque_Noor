import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseServer, validateSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    // Step 1: Check if user is authenticated (validate session token)
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie) {
      return NextResponse.json(
        {
          success: false,
          message: "غير مصرح لك بهذا الإجراء",
        },
        { status: 401 },
      );
    }

    // Validate session token against database
    const session = await validateSession(sessionCookie.value);

    if (!session.valid || !session.adminId) {
      return NextResponse.json(
        {
          success: false,
          message: "غير مصرح لك بهذا الإجراء",
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Step 2: Validate input - all fields are required
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "جميع الحقول مطلوبة",
        },
        { status: 400 },
      );
    }

    // Step 3: Validate new password length (minimum 8 characters)
    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل",
        },
        { status: 400 },
      );
    }

    // Step 4: Get admin from database using session admin ID (not hardcoded username)
    const { data: admin, error: queryError } = await supabaseServer
      .from("admin")
      .select("id, username, password_hash")
      .eq("id", session.adminId)
      .single();

    if (queryError || !admin) {
      console.error("Admin not found:", queryError);
      return NextResponse.json(
        {
          success: false,
          message: "المستخدم غير موجود",
        },
        { status: 404 },
      );
    }

    // Step 5: Verify current password matches the stored hash
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password_hash,
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "كلمة المرور الحالية غير صحيحة",
        },
        { status: 400 },
      );
    }

    // Step 6: Hash the new password using bcrypt (10 salt rounds)
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Step 7: Update the password_hash in the database
    const { error: updateError } = await supabaseServer
      .from("admin")
      .update({ password_hash: newPasswordHash })
      .eq("id", admin.id);

    if (updateError) {
      console.error("Password update error:", updateError);
      return NextResponse.json(
        {
          success: false,
          message: "حدث خطأ أثناء تحديث كلمة المرور",
        },
        { status: 500 },
      );
    }

    // Step 8: Success - password changed
    return NextResponse.json({
      success: true,
      message: "تم تغيير كلمة المرور بنجاح",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء تغيير كلمة المرور",
      },
      { status: 500 },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
