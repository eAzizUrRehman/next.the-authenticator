import connectDB from '@/db/connect';
import { extractUserFromJWTToken } from '@/lib/auth.utils';
import Customer from '@/models/customer.model';

export async function POST(request: Request) {
  await connectDB();

  const data = await request.json();

  const verifiedUser = await extractUserFromJWTToken();

  if (!verifiedUser) {
    return Response.json(
      {
        success: false,
        message: 'Unauthorized to create customer',
      },
      { status: 401 }
    );
  }

  try {
    const { name, email, phone, country, city, zip, profilePicture } = data;

    const existingCustomerByEmail = await Customer.findOne({ email });

    if (existingCustomerByEmail) {
      return Response.json(
        {
          success: false,
          message: 'Email already in use',
        },
        { status: 400 }
      );
    }

    const newCustomer = new Customer({
      name,
      email,
      phone,
      country,
      city,
      zip,
      profilePicture,
      createdBy: verifiedUser._id, // Ensure this is correct
    });

    await newCustomer.save();

    return Response.json(
      {
        success: true,
        message: 'Customer added successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding customer:', error);
    return Response.json(
      {
        success: false,
        message: 'Error adding customer',
      },
      { status: 500 }
    );
  }
}
