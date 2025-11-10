"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css'; 

// --- SVG Icons ---
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export default function Header() {
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]); 

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="JobStart Logo"
            width={30}
            height={30}
            priority
          />
          Job Start
        </Link>
      </div>
      
      <nav className={styles.navLinks}>
        <Link href="/">
          Home
        </Link>
        <a href="/#about-section">
          About
        </a>
        <a href="/#features-section">
          Features
        </a>
      </nav>
      
      <div className={styles.actions}>
        <button 
          onClick={toggleDarkMode} 
          className={styles.themeToggle}
          aria-label="Toggle dark mode" 
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        <Link href="/auth/login" className={styles.loginButton}>
          Login
        </Link>
        <Link href="/auth/signup" className={styles.authButton}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}