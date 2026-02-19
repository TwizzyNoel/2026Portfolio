function Sidebar({ darkMode, setDarkMode }) {
    return (
      <aside className="sidebar">
        <nav>
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
  
        <div className="dark-toggle">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>
        </div>
      </aside>
    );
  }
  
  export default Sidebar;
  