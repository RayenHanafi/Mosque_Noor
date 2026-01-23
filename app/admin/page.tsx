"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send/receive cookies
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Successful login → redirect to dashboard
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 43, 30, 0.9), rgba(59, 43, 30, 0.9)), url('/hero-bg.jpg')`,
        }}
      />

      {/* Islamic Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <defs>
            <pattern
              id="islamic-pattern-login"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="50,10 61,39 90,39 67,58 78,87 50,70 22,87 33,58 10,39 39,39"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-login)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="جامع النور"
              width="80"
              height="80"
              className="object-contain mx-auto mb-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              لوحة الإدارة
            </h1>
            <p className="text-white/80 text-sm">جامع النور - بومهل البساتين</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-white mb-2 text-right"
              >
                اسم المستخدم
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/60 focus:outline-none text-right"
                placeholder="أدخل اسم المستخدم"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white mb-2 text-right"
              >
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/60 focus:outline-none text-right"
                placeholder="أدخل كلمة المرور"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-right">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-white/80 hover:text-white text-sm underline transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
