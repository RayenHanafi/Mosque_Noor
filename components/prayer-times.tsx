"use client";

import { useEffect, useState } from "react";

export function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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
              id="islamic-pattern"
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
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>
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
                      <p className="text-lg font-bold">12:53</p>
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
                      <p className="text-lg font-bold">12:53</p>
                    </div>
                  </div>

                  {/* Mobile: 2x3 Grid for Main Prayers */}
                  <div className="grid grid-cols-2 gap-3 md:hidden">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الصبح</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">05:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الظهر</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">12:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">العصر</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">12:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">المغرب</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">12:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">العشاء</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">12:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الشروق</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">12:53</p>
                    </div>
                  </div>

                  {/* Mobile: Friday Prayer in separate row */}
                  <div className="block md:hidden">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white max-w-xs mx-auto hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-1 text-sm">الجمعة</p>
                      <p className="text-xs text-white/70">إبتداء من</p>
                      <p className="text-base font-bold">12:53</p>
                    </div>
                  </div>

                  {/* Desktop: 5 Prayer Times in Row */}
                  <div className="hidden md:grid md:grid-cols-5 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">الصبح</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">05:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">الظهر</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">12:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">العصر</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">12:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">المغرب</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">12:53</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="font-semibold mb-2">العشاء</p>
                      <p className="text-sm text-white/70">إبتداء من</p>
                      <p className="text-lg font-bold">12:53</p>
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
