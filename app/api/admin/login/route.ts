import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Create server-side Supabase client with service role key
const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Step 1: Validate input - both username and password are required
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم وكلمة المرور مطلوبان",
        },
        { status: 400 },
      );
    }

    // Step 2: Query the admin table to find user by username
    const { data: admin, error: queryError } = await supabaseServer
      .from("admin")
      .select("id, username, password_hash")
      .eq("username", username)
      .single();

    // Step 3: Check if username exists in database
    if (queryError || !admin) {
      console.error("Admin not found or query error:", queryError);
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم أو كلمة المرور غير صحيحة",
        },
        { status: 401 },
      );
    }

    // Step 4: Compare entered password with stored password_hash using bcrypt
    // bcrypt.compare() will encrypt the entered password and compare it with the stored hash
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    // Step 5: If passwords don't match, deny access
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم أو كلمة المرور غير صحيحة",
        },
        { status: 401 },
      );
    }

    // Step 6: Password is correct - Create session and grant access
    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user: {
        id: admin.id,
        username: admin.username,
      },
    });

    // Set secure HTTP-only cookie for session
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء تسجيل الدخول",
      },
      { status: 500 },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
