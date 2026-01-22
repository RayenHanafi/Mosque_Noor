import { Calendar } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "درس: اركان الايمان",
    date: "25-02-2026 في 16:00",
    description:
      "الإيمان هو التصديق والاطمئنان. وهو من ستة أركان في القلب والذي توحدت فيها كل الفقه تونسا بشتي فهم الابات. وفي الاصطلاح الشر عن فهو الإيمان بالله والإيمان بملائكته والإيمان بكتبه والإيمان برسله والإيمان باليوم الآخر والإيمان بالقدر خيره وشره.",
  },
  {
    id: 2,
    title: "درس: اركان الايمان",
    date: "25-02-2026 في 16:00",
    description:
      "الإيمان هو التصديق والاطمئنان. وهو من ستة أركان في القلب والذي توحدت فيها كل الفقه تونسا بشتي فهم الابات. وفي الاصطلاح الشر عن فهو الإيمان بالله والإيمان بملائكته والإيمان بكتبه والإيمان برسله والإيمان باليوم الآخر والإيمان بالقدر خيره وشره.",
  },
  {
    id: 3,
    title: "درس: اركان الايمان",
    date: "25-02-2026 في 16:00",
    description:
      "الإيمان هو التصديق والاطمئنان. وهو من ستة أركان في القلب والذي توحدت فيها كل الفقه تونسا بشتي فهم الابات. وفي الاصطلاح الشر عن فهو الإيمان بالله والإيمان بملائكته والإيمان بكتبه والإيمان برسله والإيمان باليوم الآخر والإيمان بالقدر خيره وشره.",
  },
];

export function Announcements() {
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
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="bg-amber-50 rounded-lg md:rounded-xl p-4 md:p-6 shadow-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 md:mb-4 gap-2">
                        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-amber-900">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center gap-1 md:gap-2 text-amber-700 text-xs md:text-sm bg-amber-100 px-2 md:px-3 py-1 rounded-full w-fit">
                          <Calendar size={14} className="md:w-4 md:h-4" />
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                      <p className="text-amber-800 leading-relaxed text-sm md:text-base lg:text-lg">
                        {announcement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
