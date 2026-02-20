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
              Built, designed and helped to maintain multiple full stack projects, mainly using react and node.js.
              Capabilities in both fron and back end development.
            </p>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          {/* Weather App */}
          <div className="card">
            <h3>Weather App</h3>
            <p>
              Simple clean weather app made by React and OpenWeather API.
            </p>
            <a
              href="https://github.com/TwizzyNoel/2026Portfolio/tree/main/src/projects/react-weather-app"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 
                3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
                -.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.084-.729.084-.729 
                1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998 
                .108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 
                0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 
                2.28-1.552 3.285-1.23 3.285-1.23 .645 1.653.24 2.873.12 3.176 
                .765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922 
                .429.37.81 1.096.81 2.21 0 1.595-.015 2.88-.015 3.27 
                0 .315.21.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Raccoon Fanshop */}
          <div className="card">
            <h3>Trash tracking application for Tredu (frontend)</h3>
            <p>
              Phone and web applications to track the fullness of the trash bins in Tredu. Sending notifications to staff once theyre full.            </p>
            <a
              href="https://github.com/TwizzyNoel/2026Portfolio/tree/main/src/projects/alyroskis-koodi-alyroskis-tiimi-main"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 
                3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
                -.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.084-.729.084-.729 
                1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998 
                .108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 
                0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 
                2.28-1.552 3.285-1.23 3.285-1.23 .645 1.653.24 2.873.12 3.176 
                .765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922 
                .429.37.81 1.096.81 2.21 0 1.595-.015 2.88-.015 3.27 
                0 .315.21.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Luh Cat Runner */}
          <div className="card">
            <h3>Trivia game built with php</h3>
            <p>
              Pokemon themed trivia game built with php.
            </p>
            <a
              href="https://github.com/TwizzyNoel/2026Portfolio/tree/main/src/projects/harj9"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 
                3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
                -.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.084-.729.084-.729 
                1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998 
                .108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 
                0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 
                2.28-1.552 3.285-1.23 3.285-1.23 .645 1.653.24 2.873.12 3.176 
                .765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922 
                .429.37.81 1.096.81 2.21 0 1.595-.015 2.88-.015 3.27 
                0 .315.21.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              View on GitHub
            </a>
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
      { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
      { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
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
