import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#3D3229] text-white px-40 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo & Contact Info */}
          <div className="space-y-4">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2">
              <img
                src="/logo_white.png"
                alt="جامع النور"
                width="30"
                height="30"
                className="object-contain sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
              />
              <span className="text-lg font-bold">جامع النور</span>
            </a>
            <div className="space-y-2 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>76 شارع الحرية، بومهل البساتين</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span dir="ltr">+216 99 999 999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>Mosque.noor@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 text-white/70">
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
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          © جميع الحقوق محفوظة — مسجد النور | 2026
        </div>
      </div>
    </footer>
  );
}
