export function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
              id="islamic-pattern-about"
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
          <rect width="100%" height="100%" fill="url(#islamic-pattern-about)" />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-8 md:mb-12">
            من نحن
          </h2>

          <div className="max-w-7xl mx-auto">
            <div
              className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl min-h-[400px] md:min-h-[500px] flex items-center"
              style={{
                backgroundImage: `url('/about-bg.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay */}
              {/* <div className="absolute inset-0 bg-black/60"></div> */}

              {/* Content */}
              <div className="relative z-10 w-full p-4 md:p-8 lg:p-12">
                <div className="max-w-4xl mr-0 text-right">
                  <p className="text-base md:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed font-medium">
                    مسجد النور هو مركز ديني واجتماعي
                    <br className="hidden md:block" />
                    <span className="md:hidden"> </span>
                    يخدم سكان المنطقة ويهدف إلى
                    <br className="hidden md:block" />
                    <span className="md:hidden"> </span>
                    إقامة الصلوات، تعليم القرآن الكريم،
                    <br className="hidden md:block" />
                    <span className="md:hidden"> </span>
                    وتنظيم الدروس والأنشطة الدينية
                    <br className="hidden md:block" />
                    <span className="md:hidden"> </span>
                    لكافة الفئات العمرية، في جو يسوده
                    <br className="hidden md:block" />
                    <span className="md:hidden"> </span>
                    الاحترام والتعاون.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
