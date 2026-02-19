import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import CustomCursor from "./components/CustomCursor";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Custom Blue and Pink Heart Cursor */}
      <CustomCursor />

      {/* Background Effects */}
      <div className="bg-noise"></div>
      <div className="bg-gradient"></div>

      {/* Sidebar */}
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content */}
      <main className="content">
        {/* HERO */}
        <section className="hero" id="home">
          <h1>twizzy</h1>

          <p className="about">
            Creative developer building bold, aesthetic, and modern web
            experiences with smooth interactions and clean design systems.
          </p>

          <p className="location">📍 Your City, Country</p>
        </section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience">
          <div className="card">
            <h3>Frontend Developer</h3>
            <p>Company Name • 2023 – Present</p>
            <p>
              Building high-performance React applications with scalable
              component architecture and polished UI animations.
            </p>
          </div>

          <div className="card">
            <h3>Freelance Developer</h3>
            <p>2022 – 2023</p>
            <p>
              Designed and developed custom portfolio websites and business
              platforms with modern aesthetics and responsive layouts.
            </p>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="card">
            <h3>Luxury Portfolio</h3>
            <p>
              A high-end React portfolio featuring custom cursor, glow effects,
              glass UI, and animated gradients.
            </p>
          </div>

          <div className="card">
            <h3>Dashboard Platform</h3>
            <p>
              Interactive dashboard with authentication, dynamic data
              rendering, and responsive component system.
            </p>
          </div>

          <div className="card">
            <h3>E-Commerce UI</h3>
            <p>
              Modern storefront interface with filtering, cart logic,
              and smooth micro-interactions.
            </p>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact Me">
          <div className="card">
            <p><strong>Email:</strong> your@email.com</p>
            <p><strong>GitHub:</strong> github.com/yourusername</p>
            <p><strong>LinkedIn:</strong> linkedin.com/in/yourusername</p>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
