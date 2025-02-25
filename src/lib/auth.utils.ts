'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';
import { DecodedToken } from '@/app/api/user/renew-access-token/route';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const extractUserFromJWTToken = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) return null;

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as DecodedToken;

    const user = await User.findById(decodedToken?._id as string).select(
      '-password -refreshToken'
    );

    if (!user) return null;

    return user;
  } catch (error) {
    console.error('Error extracting user from JWT token:', error);
    return null;
  }
};

export const generateAndSaveAccessAndRefreshTokens = async (
  userId: string
): Promise<Tokens | null> => {
  try {
    const user = await User.findById(userId);

    if (!user) return null;

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(
      'Error generating and saving access and refresh tokens:',
      error
    );
    return null;
  }
};
