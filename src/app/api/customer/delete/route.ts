import connectDB from '@/db/connect';
import Customer from '@/models/customer.model';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  await connectDB();

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Customer deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting customer' },
      { status: 500 }
    );
  }
}
