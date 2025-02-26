'use client';

import { Button } from './ui/button';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import NavigationMenuComponent from './NavigationMenuComponent';
import ThemeSwitcher from './ThemeSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const HeaderComponent = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const signOutUser = async () => {
    if (isButtonLoading) return;

    try {
      setIsButtonLoading(true);
      const response = await axios.post(`/api/user/signout`);
      toast.success(response?.data?.message || 'User signed out successfully');
    } catch (error) {
      console.error('Error signing out user:', error);
    } finally {
      setIsButtonLoading(false);
    }
    router.push('/signin');
  };

  return (
    <header className="mb-5 flex min-h-[68px] flex-col items-center justify-between gap-x-5 gap-y-2 rounded-xl border border-gray-500 px-5 py-1 md:flex-row">
      <Link href="/" className="font-bold text-[#ffa500]">
        the authenticator
      </Link>
      <div className="flex grow flex-col-reverse items-center gap-x-5 gap-y-2 md:flex-row md:justify-between">
        <NavigationMenuComponent />
        <div className="flex items-center space-x-5 *:shrink-0">
          <ThemeSwitcher />
          <button className="h-fit w-fit overflow-hidden rounded-full">
            <a
              href="https://github.com/eAzizUrRehman/next.the-authenticator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/github-icon.svg"
                alt="github icon"
                className=""
                width={32}
                height={32}
              />
            </a>
          </button>
          {pathname !== '/signin' && pathname !== '/signup' && (
            <Button
              className=""
              onClick={signOutUser}
              disabled={isButtonLoading}
            >
              {isButtonLoading && (
                <Image
                  src="/gif/loading.gif"
                  alt="loading"
                  width={20}
                  height={20}
                  className="bg-transparent"
                />
              )}
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
