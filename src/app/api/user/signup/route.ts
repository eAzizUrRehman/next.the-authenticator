import connectDB from '@/db/connect';
import User from '@/models/user.model';
import { signUpSchema } from '@/schemas/signup.schema';

export async function POST(request: Request) {
  await connectDB();

  const data = await request.json();

  const result = signUpSchema.safeParse(data);

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
    const { name, email, password } = data;

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: 'Email already in use',
        },
        { status: 400 }
      );
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please log into your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}
