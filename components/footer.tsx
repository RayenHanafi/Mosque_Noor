import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#3D3229] text-white px-4 sm:px-8 md:px-16 lg:px-40 py-8 md:py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-8">
          {/* Logo & Contact Info */}
          <div className="space-y-4 text-center md:text-right">
            {/* Logo */}
            <a href="#hero" className="flex items-center justify-center md:justify-start gap-2">
              <img
                src="/logo_white.png"
                alt="جامع النور"
                width="40"
                height="40"
                className="object-contain w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
              />
              <span className="text-base sm:text-lg font-bold">جامع النور</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-row md:flex-col gap-4 md:gap-2 text-white/70 text-sm sm:text-base">
            <a
              href="#prayer-times"
              className="hover:text-white transition-colors"
            >
              اوقات الصلاة
            </a>
            <a
              href="#announcements"
              className="hover:text-white transition-colors"
            >
              الاعلانات
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              من نحن
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10 text-center text-white/50 text-xs sm:text-sm">
          © جميع الحقوق محفوظة — مسجد النور | 2026
        </div>
      </div>
    </footer>
  );
}
