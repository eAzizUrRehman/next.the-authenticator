'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex size-full items-center justify-center">
      <div className="mx-auto flex size-fit flex-col items-center gap-y-5 rounded-xl border border-gray-500 p-10">
        <h2 className="w-fit text-lg font-semibold">Not Found</h2>
        <p>Could not find this page</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </div>
  );
}
