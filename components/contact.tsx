import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 43, 30, 0.9), rgba(59, 43, 30, 0.9)), url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2127&auto=format&fit=crop')`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          تواصل معنا
        </h2>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/90 text-xl mb-8">
            يسعدنا تواصلكم معنا لأي استفسار أو اقتراح.
          </p>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-center justify-center gap-4 text-white">
              <span className="text-white/70">العنوان:</span>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                <span>76 شارع الحرية، بومهل البساتين</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-center gap-4 text-white">
              <span className="text-white/70">الهاتف:</span>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-accent" />
                <span dir="ltr">+216 99 999 999</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-4 text-white">
              <span className="text-white/70">البريد الإلكتروني:</span>
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-accent" />
                <span>Mosque.noor@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
