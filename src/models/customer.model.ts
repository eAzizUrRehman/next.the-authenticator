import mongoose, { Schema, Document } from 'mongoose';

export interface Customer extends Document {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
  profilePicture: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const customerSchema: Schema<Customer> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    index: true,
    maxlength: [50, 'Name must be less than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: [50, 'Email must be less than 50 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
    maxlength: [15, 'Phone must be less than 15 characters'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [50, 'Country must be less than 50 characters'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City must be less than 50 characters'],
  },
  zip: {
    type: String,
    required: [true, 'Zip is required'],
    trim: true,
    maxlength: [10, 'Zip must be less than 10 characters'],
  },
  profilePicture: {
    type: String,
    required: [true, 'Profile picture is required'],
    trim: true,
    maxlength: [255, 'Profile picture must be less than 255 characters'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator reference is required'],
  },
});

const Customer =
  (mongoose.models.Customer as mongoose.Model<Customer>) ||
  mongoose.model<Customer>('Customer', customerSchema);

export default Customer;
