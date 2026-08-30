import { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Let's Talk | Paragon",
  description: "Tell us what you're working on and what you need.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      <ContactHero />

      <section className="w-full flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <ContactInfo />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
