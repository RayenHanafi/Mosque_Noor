import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create server-side Supabase client with service role key
// NOTE: Add these environment variables (NO NEXT_PUBLIC_ prefix for server keys):
// SUPABASE_URL=your-supabase-url
// SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Server-only key with elevated permissions
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم وكلمة المرور مطلوبان",
        },
        { status: 400 },
      );
    }

    // Use RPC function to safely verify credentials with PostgreSQL crypt()
    // This prevents SQL injection and uses secure server-side verification
    try {
      const { data, error } = await supabaseServer
        .rpc("verify_admin_login", {
          input_username: username,
          input_password: password,
        })
        .single();

      if (error) {
        console.error("Database RPC error:", error);
        // If RPC function doesn't exist, fall back to simple check for now
        if (error.code === "PGRST202") {
          console.warn("RPC function not found, using fallback authentication");
          if (username === "admin" && password === "Noor2026!") {
            // Fallback success response
            const response = NextResponse.json({
              success: true,
              message: "تم تسجيل الدخول بنجاح",
              user: {
                id: 1,
                username: "admin",
              },
            });

            response.cookies.set("admin_session", "authenticated", {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
              maxAge: 8 * 60 * 60,
            });

            return response;
          } else {
            return NextResponse.json(
              {
                success: false,
                message: "اسم المستخدم أو كلمة المرور غير صحيحة",
              },
              { status: 401 },
            );
          }
        }

        return NextResponse.json(
          {
            success: false,
            message: "خطأ في قاعدة البيانات",
          },
          { status: 500 },
        );
      }

      // Check if credentials are valid
      if (!data || !(data as any).verified) {
        return NextResponse.json(
          {
            success: false,
            message: "اسم المستخدم أو كلمة المرور غير صحيحة",
          },
          { status: 401 },
        );
      }

      // Create secure session cookie for RPC success
      const response = NextResponse.json({
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        user: {
          id: (data as any).id,
          username: (data as any).username,
        },
      });

      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 8 * 60 * 60,
      });

      return response;
    } catch (rpcError) {
      console.error("RPC call failed:", rpcError);
      return NextResponse.json(
        {
          success: false,
          message: "خطأ في قاعدة البيانات",
        },
        { status: 500 },
      );
    }
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
