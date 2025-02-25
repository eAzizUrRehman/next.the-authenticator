'use client';

import { useCallback, useEffect, useState } from 'react';
import TableComponent, { Header } from '@/components/TableComponent';
import axios, { AxiosResponse } from 'axios';
import { renewAccessToken } from '@/lib/jwt.utils';
import { toast } from 'sonner';

const headers: Header[] = [
  { id: '1', name: 'Name' },
  { id: '2', name: 'Email' },
  { id: '3', name: 'Phone' },
  { id: '4', name: 'Country' },
  { id: '5', name: 'City' },
  { id: '6', name: 'Zip' },
  { id: '7', name: 'Action' },
];

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
}

interface FetchCustomersResponse {
  customers: Customer[];
}

const DashboardPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async (): Promise<
    AxiosResponse<FetchCustomersResponse>
  > => {
    try {
      const response =
        await axios.get<FetchCustomersResponse>('/api/customer/all');
      return response;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  };

  const fetchData = useCallback(async () => {
    let response: AxiosResponse<FetchCustomersResponse>;

    try {
      response = await fetchCustomers();

      if (response.status === 401) {
        await renewAccessToken();
        response = await fetchCustomers();
      }

      if (response.status === 200) {
        setCustomers(response.data.customers);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete('/api/customer/delete', {
        data: { id },
      });

      toast('Success', {
        description: response.data.message || 'Customer deleted successfully.',
      });

      await fetchData();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="size-full">
      <TableComponent
        caption="List of customers registered by you."
        headers={headers}
        data={customers}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DashboardPage;
