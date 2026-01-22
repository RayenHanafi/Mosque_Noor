import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PrayerTimes } from "@/components/prayer-times"
import { Announcements } from "@/components/announcements"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <PrayerTimes />
      <Announcements />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
