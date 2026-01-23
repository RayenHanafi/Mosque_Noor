"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Announcement {
  id: number;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  created_at: string;
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6); // Show only latest 6 announcements

        if (data && !error) {
          setAnnouncements(data);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);
  return (
    <section
      id="announcements"
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('/pattern-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <defs>
            <pattern
              id="islamic-pattern-announcements"
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
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#islamic-pattern-announcements)"
          />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-8 md:mb-12">
            الاعلانات
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="bg-amber-900/80 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-10 shadow-xl">
              {/* Scrollable container */}
              <div
                className="max-h-[400px] md:max-h-[500px] lg:max-h-[700px] overflow-y-auto space-y-3 md:space-y-4 scrollbar-hide"
                dir="ltr" // Forces scrollbar to the right side
              >
                <div dir="rtl" className="space-y-3 md:space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-200 mx-auto mb-4"></div>
                      <p className="text-amber-200">جاري تحميل الإعلانات...</p>
                    </div>
                  ) : announcements.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-amber-200 text-lg">
                        لا توجد إعلانات حالياً
                      </p>
                    </div>
                  ) : (
                    announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="bg-amber-50 rounded-lg md:rounded-xl p-4 md:p-6 shadow-md"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 md:mb-4 gap-2">
                          <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-amber-900">
                            {announcement.title}
                          </h3>
                          {(announcement.date || announcement.time) && (
                            <div className="flex items-center gap-1 md:gap-2 text-amber-700 text-xs md:text-sm bg-amber-100 px-2 md:px-3 py-1 rounded-full w-fit">
                              <Calendar size={14} className="md:w-4 md:h-4" />
                              <span>
                                {announcement.date &&
                                  new Date(
                                    announcement.date,
                                  ).toLocaleDateString("ar-TN")}
                                {announcement.date &&
                                  announcement.time &&
                                  " في "}
                                {announcement.time}
                              </span>
                            </div>
                          )}
                        </div>
                        {announcement.description && (
                          <p className="text-amber-800 leading-relaxed text-sm md:text-base lg:text-lg">
                            {announcement.description}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
