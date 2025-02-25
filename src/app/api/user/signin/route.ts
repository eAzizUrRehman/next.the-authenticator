import connectDB from '@/db/connect';
import { generateAndSaveAccessAndRefreshTokens } from '@/lib/auth.utils';
import User from '@/models/user.model';
import { signInSchema } from '@/schemas/signin.schema';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  await connectDB();

  const data = await request.json();

  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return Response.json(
      {
        success: false,
        message: 'One or more fields are invalid',
      },
      { status: 400 }
    );
  }

  try {
    const { email, password } = data;

    const existingUserByEmail = await User.findOne({ email });

    if (!existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 400 }
      );
    }

    const isPasswordValid =
      await existingUserByEmail.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 400 }
      );
    }

    const tokens = await generateAndSaveAccessAndRefreshTokens(
      existingUserByEmail._id as string
    );

    if (!tokens) {
      throw new Error('Failed to generate tokens');
    }

    const { accessToken, refreshToken } = tokens;

    const signedInUser = await User.findById(existingUserByEmail._id).select(
      '-password -refreshToken'
    );

    const cookieStore = await cookies();

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
      signedInUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error signing in user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error signing in user',
      },
      { status: 500 }
    );
  }
}
