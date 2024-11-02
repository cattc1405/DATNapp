import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://app-datn-gg.onrender.com/api/v1';
// const apiUrl = 'http://localhost:3000/api/v1';

const apiInstance = axios.create({
  baseURL: 'https://app-datn-gg.onrender.com/api/v1', // Adjust this base URL if necessary
  // baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000, // Optional: Set a timeout
  headers: {
    'Content-Type': 'application/json', // Optional: Customize headers as needed
  },
});
// Hàm đăng nhập người dùng
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });
    const token = response.data.token;

    // Lưu token vào AsyncStorage
    await AsyncStorage.setItem('userToken', token);

    return response.data; // Trả về dữ liệu phản hồi từ API
  } catch (error) {
    console.error(
      'Lỗi khi đăng nhập:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Ném lỗi để xử lý phía trên
  }
};
// Get categories function
export const getCategories = async () => {
  try {
    const response = await apiInstance.get('/category');
    console.log('Categories response:', response); // Log the full response
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    console.error(
      'Error details:',
      error.response ? error.response : error.message,
    );
    throw error;
  }
};
export const getProduct = async () => {
  try {
    const response = await apiInstance.get('/products/get/active');
    console.log('Product response:', response); // Log the full response
    return response.data;
  } catch (error) {
    console.error('Error fetching Product:', error);
    console.error(
      'Error details:',
      error.response ? error.response : error.message,
    );
    throw error;
  }
};
export const getProductById = async id => {
  try {
    const response = await apiInstance.get(`/products/${id}`);
    console.log('Product response:', response); // Log the full response
    return response.data;
  } catch (error) {
    console.error('Error fetching Product:', error);
    console.error(
      'Error details:',
      error.response ? error.response : error.message,
    );
    throw error;
  }
};
export const getAttributeByProductId = async id => {
  try {
    const response = await apiInstance.get(`/attributes/by-product/${id}`);
    console.log('Attribute response:', response); // Log the full response
    return response.data;
  } catch (error) {
    console.error('Error fetching Attribute:', error);
    console.error(
      'Error details:',
      error.response ? error.response : error.message,
    );
    throw error;
  }
};
// Update user information
export const addUserCart = async (id, itemOrder, token) => {
  try {
    const payload = {cart: itemOrder}; // Prepare the payload
    console.log('Payload being sent:', payload); // Log the payload for debugging

    // Set the request headers to include the Bearer token
    const response = await apiInstance.post(`/users/userCart/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
      },
    });

    console.log('User update response:', response.data); // Log the updated data response
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response.data); // Log error response
    throw error;
  }
};
export const getUserCart = async (id, token) => {
  try {
    const response = await apiInstance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    console.log('User cart response:', response); // Log full response
    return response.data; // Return the user cart data
  } catch (error) {
    console.error('Error fetching user cart:', error); // Log any errors
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error; // Rethrow the error for further handling
  }
};

export const submitOrder = async (
  orderItems,
  paymentMethob,
  userId,
  shippingAddress,
  restaurant,
  token,
) => {
  try {
    const payload = {
      orderItems,
      paymentMethob: paymentMethob,
      userId,
      shippingAddress,
      restaurant,
    };

    const response = await apiInstance.post(`/orders/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Post order response:', response.data); // Log full response
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error Post order:', error); // Log any errors
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error; // Rethrow the error for further handling
  }
};
export const clearCart = async (id, token) => {
  try {
    const response = await apiInstance.delete(`/users/${id}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Clearing cart response:', response.data); // Log full response
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error clearing cart:', error); // Log any errors
    throw error; // Rethrow the error for further handling
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};
