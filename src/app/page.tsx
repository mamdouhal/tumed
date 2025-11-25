import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Activities from "@/components/Activities";
import News from "@/components/News";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Activities />
        <News />
        <Testimonials />
        <Stats />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
