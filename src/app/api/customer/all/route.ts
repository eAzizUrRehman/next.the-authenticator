import connectDB from '@/db/connect';
import { extractUserFromJWTToken } from '@/lib/auth.utils';
import Customer from '@/models/customer.model';

export async function GET() {
  await connectDB();

  const verifiedUser = await extractUserFromJWTToken();

  if (!verifiedUser) {
    return Response.json(
      {
        success: false,
        message: 'Unauthorized to access customers',
      },
      { status: 401 }
    );
  }

  try {
    const customers = await Customer.find({ createdBy: verifiedUser._id });

    return Response.json(
      {
        success: true,
        message: 'Customers fetched successfully',
        customers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching customers:', error);
    return Response.json(
      {
        success: false,
        message: 'Error fetching customers',
      },
      { status: 500 }
    );
  }
}
