"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface ContactSettings {
  phone: string;
  email: string;
}

export function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactSettings>({
    phone: "+216 00 000 000",
    email: "contact@noor.tn",
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from("admin_settings")
          .select("phone, email")
          .single();

        if (data && !error) {
          setContactInfo({
            phone: data.phone || "+216 00 000 000",
            email: data.email || "contact@noor.tn",
          });
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);
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
                <span dir="ltr">{contactInfo.phone}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-4 text-white">
              <span className="text-white/70">البريد الإلكتروني:</span>
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-accent" />
                <span>{contactInfo.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
