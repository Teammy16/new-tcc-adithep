import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import layout from "./components/layout";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* เมนูหลักส่วนหัว */}
        <Navbar />

        {/* ขอบเขตการจัดหน้าตาม Layout หลัก */}
        <main className="max-w-6xl mx-auto px-8 py-4">
          <section id="home">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="projects">
            <Projects />
          </section>
        </main>
      </div>

      {/* ส่วนท้ายเว็บแสดงข้อมูลติดต่อ */}
      <Footer />
    </div>
  );
}