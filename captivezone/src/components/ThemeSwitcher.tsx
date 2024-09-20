"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>('light');
  
  // Vérification si le thème est stocké dans localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

 
  }, []);


  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Sauvegarder le thème choisi dans localStorage
  };

  return (
    <nav className='h-18 flex flex-row justify-between md:justify-end items-center py-2 px-5 border-b'>
      <h1 className='block md:hidden font-semibold uppercase'>Mode {theme === 'light' ? 'Clair' : 'Sombre'}</h1>
      <button onClick={toggleTheme} className='py-2 px-4 rounded' >
        Passer au mode {theme === 'light' ? 'Sombre' : 'Clair'}
      </button>
      <Image
        src={theme === "light" ? "/images/sky.png" :"/images/stars.png"}
        alt="Background"
        width={1280}
        height={960}
        className='fixed min-h-screen max-sm:min-h-[120vh] w-screen inset-0 bg-cover bg-repeat opacity-80 -z-10 '
      />
    </nav>
  );
};

export default ThemeSwitcher;
