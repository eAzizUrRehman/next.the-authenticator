import connectDB from '@/db/connect';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@/models/user.model';
import { generateAndSaveAccessAndRefreshTokens } from '@/lib/auth.utils';

export interface DecodedToken extends JwtPayload {
  _id: string;
}

export async function POST() {
  await connectDB();

  const cookieStore = await cookies();
  const incomingRefreshToken = cookieStore.get('refreshToken')?.value;

  if (!incomingRefreshToken) {
    return Response.json(
      {
        success: false,
        message: 'Unauthorized request',
      },
      { status: 401 }
    );
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as DecodedToken;

    const user = await User.findById(decodedToken?._id);

    if (!user || incomingRefreshToken !== user?.refreshToken) {
      return Response.json(
        {
          success: false,
          message: 'Unauthorized request',
        },
        { status: 401 }
      );
    }

    const tokens = await generateAndSaveAccessAndRefreshTokens(
      user._id as string
    );

    if (!tokens) {
      throw new Error('Failed to generate tokens');
    }

    const { accessToken, refreshToken } = tokens;

    cookieStore.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: true,
      path: '/',
    });

    cookieStore.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return Response.json({
      success: true,
      message: 'User logged In Successfully',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error generating access token:', error);
    return Response.json(
      {
        success: false,
        message: 'Error generating access token',
      },
      { status: 500 }
    );
  }
}
