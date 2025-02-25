import connectDB from '@/db/connect';
import { extractUserFromJWTToken } from '@/lib/auth.utils';
import User from '@/models/user.model';
import { cookies } from 'next/headers';

export async function POST() {
  await connectDB();

  const verifiedUser = await extractUserFromJWTToken();

  await User.findByIdAndUpdate(
    verifiedUser?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'accessToken',
    value: '',
    httpOnly: true,
    secure: true,
    path: '/',
  });
  cookieStore.set({
    name: 'refreshToken',
    value: '',
    httpOnly: true,
    secure: true,
    path: '/',
  });

  return Response.json(
    {
      success: true,
      message: 'User signed out successfully',
    },
    { status: 200 }
  );
}
