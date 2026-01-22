import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      />

      {/* Overlay with Islamic Pattern */}
      {/* <div className="absolute inset-0 bg-secondary/90">
        <IslamicPattern />
      </div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-right pt-16 sm:pt-20">
        <div className="max-w-4xl ml-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
            جامع النور
            <br />
            بومهل البساتين
          </h1>
          <p className="text-muted-foreground max-w-xl sm:max-w-2xl mr-0 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            بيت من بيوت الله يفتح أبوابه للمصلين وطالبي العلم. تقام فيه الصلوات،
            ويُعمر بذكر الله وتلاوة كتابه، ويكون مكاناً للتعلم والتوجيه، وتقريب
            القلوب إلى الله في أجواء من السكينة والخشوع.
          </p>
          <Button
            size="default"
            variant="outline"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            asChild
          >
            <a href="#prayer-times">اوقات الصلاة</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
