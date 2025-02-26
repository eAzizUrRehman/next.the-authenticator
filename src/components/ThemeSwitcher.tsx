'use client';
import { BellIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ThemeSwitcher = () => {
  const [mount, setMount] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setMount(true);

    // if theme is light, user will be notified about dark theme
    // Toast will be shown after every 14 days
    // Max toasts count is 3

    const hasSeenToast = localStorage.getItem('hasSeenToast');
    const toastCount = parseInt(localStorage.getItem('toastCount') || '0', 10);
    const lastToastTime = parseInt(
      localStorage.getItem('lastToastTime') || '0',
      10
    );
    const currentTime = Date.now();
    const fourteenDaysInMilliseconds = 14 * 24 * 60 * 60 * 1000;

    if (
      (!hasSeenToast ||
        currentTime - lastToastTime > fourteenDaysInMilliseconds) &&
      currentTheme === 'light' &&
      toastCount < 3
    ) {
      toast('We support dark theme!', {
        description: 'Switch to dark mode for a better experience',
        icon: <BellIcon />,
      });

      localStorage.setItem('hasSeenToast', 'true');
      localStorage.setItem('toastCount', (toastCount + 1).toString());
      localStorage.setItem('lastToastTime', currentTime.toString());
    }
  }, [currentTheme]);

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
