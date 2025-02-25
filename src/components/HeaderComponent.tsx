'use client';

import Image from 'next/image';
import NavigationMenuComponent from './NavigationMenuComponent';
import { Button } from './ui/button';
import ThemeSwitcher from './ThemeSwitcher';
import axios from 'axios';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';

const HeaderComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const signOutUser = async () => {
    try {
      const response = await axios.post(`/api/user/signout`);
      toast('Success', {
        description: response.data.message || 'User signed out successfully',
      });
    } catch (error) {
      console.error('Error signing out user:', error);
    }
    router.push('/signin');
  };

  return (
    <header className="mb-5 flex min-h-[68px] items-center justify-between rounded-xl border border-gray-500 px-5 py-1">
      <NavigationMenuComponent />
      <div className="flex items-center space-x-5">
        <ThemeSwitcher />
        <button className="h-fit w-fit overflow-hidden rounded-full">
          <Image
            src="/icons/github-icon.svg"
            alt="github icon"
            className=""
            width={32}
            height={32}
          />
        </button>
        {pathname !== '/signin' && pathname !== '/signup' && (
          <Button className="" onClick={signOutUser}>
            Sign Out
          </Button>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
