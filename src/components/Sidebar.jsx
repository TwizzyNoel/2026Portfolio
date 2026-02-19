function Sidebar({ darkMode, setDarkMode }) {
    return (
      <aside className="sidebar">
        <nav>
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
  
        <button
          className="mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>
    );
  }
  
  export default Sidebar;
  