import axios from 'axios';

export const renewAccessToken = async () => {
  try {
    await axios.post('/api/user/renew-access-token');
  } catch (error) {
    console.error('Error renewing access token:', error);
  }
};
