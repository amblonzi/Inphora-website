import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Solutions from "@/components/Solutions";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Solutions />
      <Approach />
      <Contact />
      <Footer />
    </main>
  );
}
