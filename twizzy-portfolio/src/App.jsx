import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="content">
        <section className="hero" id="home">
          <h1>twizzy</h1>
          <p className="about">
            Creative developer building clean and aesthetic web experiences.
          </p>
          <p className="location">📍 Your City, Country</p>
        </section>

        <Section id="experience" title="Experience">
          <div className="card">
            <h3>Frontend Developer</h3>
            <p>Company Name • 2023 - Present</p>
            <p>
              Worked on responsive web apps using React and modern UI design
              principles.
            </p>
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="card">
            <h3>Portfolio Website</h3>
            <p>Minimal styled personal portfolio using React.</p>
          </div>

          <div className="card">
            <h3>Cool App</h3>
            <p>Built a full-stack app with authentication and dashboard UI.</p>
          </div>
        </Section>

        <Section id="contact" title="Contact Me">
          <div className="card">
            <p>Email: your@email.com</p>
            <p>GitHub: github.com/yourusername</p>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
