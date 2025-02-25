'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [mount, setMount] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  useEffect(() => {
    setMount(true);
  }, []);

  return mount ? (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      type="button"
      className="flex items-center justify-center rounded-md p-1.5 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    >
      <Image
        src={
          currentTheme === 'dark'
            ? '/icons/light-theme-icon.svg'
            : '/icons/dark-theme-icon.svg'
        }
        alt="theme switcher"
        className="dark:invert"
        width={28}
        height={28}
      />
    </button>
  ) : null;
};
export default ThemeSwitcher;
