import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import CustomCursor from "./components/CustomCursor";

import Weather1 from "./images/weather1.png";
import Weather2 from "./images/weather2.png";
import Weather3 from "./images/weather3.png";
import Trash1 from "./images/trash1.png";
import Trash2 from "./images/trash2.png";
import rich1 from "./images/rich1.png";
import rich2 from "./images/rich2.png";
import rich3 from "./images/rich3.png";
import ProjectImages from "./components/ProjectImages";

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
            Full-stack Junior Dev with hands-on experience in React, Node.js, and other modern web technologies. 
            I've maintained full-stack projects, collaborated in cross-functional teams, and quickly adapt to new tools and frameworks.
          </p>

          <p className="location">📍 Tampere, Finland • 19 years old</p>
        </section>

        {/* Tiny Download Button */}
          <a
            href="/cv/NoelCV.pdf"
            download
            className="cv-download-btn"
            title="Download my CV"
          >
            ⬇
          </a>

        {/* EXPERIENCE */}
          <Section id="experience" title="Work Experience">
          <article
            className="experience-item"
            onMouseEnter={(e) => e.currentTarget.classList.add("cursor-hover")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("cursor-hover")}
          >
            <h3>Full-stack Developer</h3>
            <p className="role">Crowdsorsa • 2024 • Internship</p>
            <p>
              Designed and maintained full-stack projects with React, Tailwind and Node.js, gaining hands-on experience in both front-end and back-end development.
            </p>
          </article>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          {/* Weather App */}
      <div className="card">
        <h3>Weather App</h3>
        <p>Simple clean weather app made by React and OpenWeather API.</p>
        <ProjectImages images={[Weather1, Weather2, Weather3]} />
        <a
          href="https://github.com/TwizzyNoel/2026Portfolio/tree/main/src/projects/react-weather-app"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub
        </a>
      </div>

      {/* Tredu Trash */}
      <div className="card">
        <h3>Trash tracking application for Tredu (Android)</h3>
        <p>Phone and web applications to track the fullness of the trash bins in Tredu. Sending notifications to staff once they're full.</p>
        <ProjectImages images={[Trash1, Trash2]} />
        <a
          href="https://github.com/TwizzyNoel/2026Portfolio/tree/main/src/projects/alyroskis-koodi-alyroskis-tiimi-main"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub
        </a>
      </div>

      {/* Noey */}
      <div className="card">
        <h3>Noey’s Ultimate Twizzy Money Printer 🩷</h3>
        <p>Crypto & Meme Coin Mock Trading Simulator</p>
        <ProjectImages images={[rich1, rich2, rich3]} />
        <a
          href="https://github.com/TwizzyNoel/twizzyRich"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          peep 1t @ GitHub twÏzz
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
    <div className="contact-container">
      <a href="mailto:noel.kivela@gmail.com" className="contact-link">
        <div className="contact-icon">📧</div>
        <div className="contact-text">
          <p>Email Me</p>
          <span>Noel Kivelä</span>
        </div>
      </a>

      <a href="https://github.com/TwizzyNoel" target="_blank" rel="noopener noreferrer" className="contact-link">
        <div className="contact-icon">💻</div>
        <div className="contact-text">
          <p>GitHub</p>
          <span>Twizzy Noel</span>
        </div>
      </a>

      <a
        href="https://www.linkedin.com/in/noel-kivel%C3%A4-a6206518b/"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
      >
        <div className="contact-icon">💼</div>
        <div className="contact-text">
          <p>LinkedIn</p>
          <span>Noel Kivelä</span>
        </div>
      </a>
    </div>
  </Section>

</main>
    </div>
  );
}

export default App;
