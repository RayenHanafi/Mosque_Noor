"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface PrayerTimesData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

export function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [jummahTime, setJummahTime] = useState<string>("12:45");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        // Using Boumhel Ben Arous, Tunisia coordinates: 36.6167, 10.2167
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=36.6167&longitude=10.2167&method=3&school=1`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch prayer times");
        }

        const data = await response.json();

        if (data.code === 200 && data.data && data.data.timings) {
          setPrayerTimes(data.data.timings);
        } else {
          throw new Error("Invalid prayer times data");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load prayer times",
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchJummahTime = async () => {
      try {
        const { data, error } = await supabase
          .from("admin_settings")
          .select("jummah_time")
          .single();

        if (data && !error) {
          setJummahTime(data.jummah_time || "12:45");
        }
      } catch (error) {
        console.error("Error fetching Jummah time:", error);
      }
    };

    fetchPrayerTimes();
    fetchJummahTime();

    // Refresh prayer times at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      fetchPrayerTimes();
      fetchJummahTime();
      // Set up daily refresh
      const dailyRefresh = setInterval(
        () => {
          fetchPrayerTimes();
          fetchJummahTime();
        },
        24 * 60 * 60 * 1000,
      );
      return () => clearInterval(dailyRefresh);
    }, msUntilMidnight);

    // Also refresh Jummah time every 5 minutes for real-time updates
    const jummahRefreshTimer = setInterval(fetchJummahTime, 5 * 60 * 1000);

    return () => {
      clearTimeout(midnightTimer);
      clearInterval(jummahRefreshTimer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-TN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ar-TN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section
      id="prayer-times"
      className="py-10 sm:py-16 md:py-20 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-8 md:mb-12">
            اوقات الصلاة
          </h2>

          <div className="max-w-5xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                backgroundImage: `linear-gradient(rgba(59, 43, 30, 0.1), rgba(59, 43, 30, 0.5)), url('/mosque-1.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="p-4 md:p-6 lg:p-8 text-center">
                {/* Location */}
                <p className="text-white/80 mb-1 md:mb-2 text-sm md:text-base">
                  بومهل بن عروس
                </p>

                {/* Date */}
                <p className="text-white/80 mb-6 md:mb-8 text-sm md:text-base">
                  {formatDate(currentTime)}
                </p>

                {/* Prayer Times Grid */}
                <div className="space-y-3 md:space-y-4">
                  {/* Mobile Layout: Current Time at Top */}
                  <div className="block md:hidden">
                    <div className="flex flex-col items-center mb-4">
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-wider font-mono">
                        {formatTime(currentTime)}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout: Top Row with Current Time in Center */}
                  <div className="hidden md:grid md:grid-cols-3 gap-4 items-center">
                    {/* Friday Prayer */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">الجمعة</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">
                        {loading ? ".." : error ? "--" : jummahTime}
                      </p>
                    </div>

                    {/* Current Time (Center - Desktop Only) */}
                    <div className="flex flex-col items-center">
                      <div className="text-5xl lg:text-6xl font-bold text-white mb-2 tracking-wider font-mono">
                        {formatTime(currentTime)}
                      </div>
                    </div>

                    {/* Sunrise */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">الشروق</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Sunrise || "--"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile: 2x3 Grid for Main Prayers */}
                  <div className="grid grid-cols-2 gap-3 md:hidden">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الصبح</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Fajr || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الظهر</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Dhuhr || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">العصر</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Asr || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">المغرب</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Maghrib || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">العشاء</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Isha || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الشروق</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Sunrise || "--"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile: Friday Prayer in separate row */}
                  <div className="block md:hidden">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white max-w-xs mx-auto hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الجمعة</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">
                        {loading ? ".." : error ? "--" : jummahTime}
                      </p>
                    </div>
                  </div>

                  {/* Desktop: 5 Prayer Times in Row */}
                  <div className="hidden md:grid md:grid-cols-5 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">الصبح</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Fajr || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">الظهر</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Dhuhr || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">العصر</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Asr || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">المغرب</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Maghrib || "--"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">العشاء</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">
                        {loading
                          ? ".."
                          : error
                            ? "--"
                            : prayerTimes?.Isha || "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
