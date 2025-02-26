'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex size-full items-center justify-center">
      <div className="mx-auto flex size-fit flex-col items-center gap-y-5 rounded-xl xxs:border xxs:p-5 md:p-10">
        <Image
          src="/gif/panda-404-not-found.gif"
          alt="404 not found"
          width={400}
          height={400}
        />

        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </div>
  );
}
