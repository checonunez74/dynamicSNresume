import React, { useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.css'; // Ensure CSS module is correctly imported
import ProfileImage from "../../assets/Lara.png"

const Sidebar = ({ data, onSelectSection }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls sidebar open/close state
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

return (
  <div>
    {/* 🔹 Hamburger Button */}
    <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
      ☰ Open Menu
    </button>

    {/* 🔹 Sidebar Navigation */}
    <nav
      ref={sidebarRef}
      className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
    >
      <div className={styles.profileContainer}>
        <h2 className={styles.sidebarTitle}>Profile</h2>
        <img src={ProfileImage} alt="Profile" className={styles.profileImage} />
      </div>

      <ul>
        {data.map((section) => (
          <li
            key={section}
            onClick={() => {
              onSelectSection(section);
              setIsOpen(false); // Close sidebar when selecting a section
            }}
          >
            {section.replace(/_/g, ' ')}
          </li>
        ))}
      </ul>
    </nav>
  </div>
);
};

export default Sidebar;
