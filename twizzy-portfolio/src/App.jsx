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
          <h1>Noel Kivelä</h1>

          <p className="about">
            Full-stack Junior Dev • 19 years old
          </p>

          <p className="location">📍 Tampere, Finland</p>
        </section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience">
          <div className="card">
            <h3>Full-stack Developer</h3>
            <p>Crowdsorsa • 2024 • Intership</p>
            <p>
              Building high-performance React applications with scalable
              component architecture and polished UI animations.
            </p>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="card">
            <h3>Weather App</h3>
            <p>
              Simple clean weather app made by React and OpenWeather API.
            </p>
          </div>

          <div className="card">
            <h3>Raccoon Fanshop</h3>
            <p>
              Simple online shop for people who love raccoons. Used technologies: React, Vite, Knex, MySQL
            </p>
          </div>

          <div className="card">
            <h3>Luh Cat Runner</h3>
            <p>
              A cool spin-off game made by unity and C#.
            </p>
          </div>
        </Section>

{/* TECHNOLOGIES */}
<Section id="technologies" title="Technologies I Use">
  <div className="tech-grid">
    {[
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Windows", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png" }
    ].map((tech) => (
      <div
        key={tech.name}
        className="tech-card"
        onMouseEnter={(e) => e.currentTarget.classList.add("cursor-hover")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("cursor-hover")}
      >
        <img src={tech.logo} alt={tech.name} />
        <p>{tech.name}</p>
      </div>
    ))}
  </div>
</Section>




        {/* CONTACT */}
        <Section id="contact" title="Contact Me">
          <div className="card">
            <p><strong>Email:</strong> <a href="mailto:noel.kivela@gmail.com">noel.kivela@gmail.com</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/TwizzyNoel" target="_blank" rel="noopener noreferrer">https://github.com/TwizzyNoel</a></p>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
