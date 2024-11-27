import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

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
export const loginGoogle = async idToken => {
  try {
    console.log('send to backend', idToken);
    // Sending the idToken to the backend for validation and login
    const response = await apiInstance.post('/users/login/google', {idToken});

    // Assuming the backend returns { user, token, userId }
    console.log('Backend response:', response.data);

    return response.data; // Returns user info and token from the API
  } catch (error) {
    // Log full error for debugging
    console.error('Google login error:', error);

    // Check if error.response exists, meaning the error is from the backend
    if (error.response) {
      // Log backend error details
      console.error('Backend error response:', error.response.data);
      throw error.response.data; // Return the specific error from the backend
    } else {
      // If no error response, return a general error
      throw {message: 'Something went wrong', error: error.message};
    }
  }
};

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
export const getBrands = async () => {
  try {
    const response = await apiInstance.get('/restaurants/get/active');
    console.log('Brand response:', response); // Log the full response
    return response.data; // Return only the data
  } catch (error) {
    console.error('Error fetching brands:', error);
    console.error(
      'Error details:',
      error.response ? error.response.data : error.message, // Log the error data if available
    );
    throw error; // Rethrow the error for further handling
  }
};

export const getFeaturedProduct = async () => {
  try {
    const num = 3; // The number of featured products to fetch
    const response = await apiInstance.get(`/products/get/featured/${num}`);
    console.log('Featured product response:', response); // Log the full response
    return response.data; // Return only the data
  } catch (error) {
    console.error('Error fetching featured products:', error);
    console.error(
      'Error details:',
      error.response ? error.response.data : error.message, // Log the error data if available
    );
    throw error; // Rethrow the error for further handling
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
export const getProductSameDeal = async () => {
  try {
    const response = await apiInstance.get('/products/get/active/price');
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
export const updateUser = async (id, userForm, token) => {
  try {
    const response = await apiInstance.put(`/client/edituser/${id}`, userForm, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
      },
    });
    console.log('User update response:', response.data); // Log the updated data response
  } catch (error) {
    console.error('Error updating user:', error.response.data); // Log error response
  }
};

export const addUserCart = async (id, itemOrder, token) => {
  try {
    const payload = {cart: itemOrder}; // Prepare the payload
    console.log('Payload being sent:', payload); // Log the payload for debugging

    // Set the request headers to include the Bearer token
    const response = await apiInstance.post(`/client/userCart/${id}`, payload, {
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
    const response = await apiInstance.get(`/client/${id}`, {
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
export const getUserOrder = async (id, token, params) => {
  try {
    // Construct the request URL with the provided ID and parameters
    const url = `https://app-datn-gg.onrender.com/api/v1/client/user/${id}?status=${params.status}`;

    // Send a GET request with the authorization token
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token for authentication
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the data based on the status
    if (params.status) {
      return data; // Return the data if a status is provided
    } else {
      throw new Error('Status parameter is required.');
    }
  } catch (error) {
    console.error('Failed to fetch user orders:', error);
    throw error; // Rethrow the error for further handling if necessary
  }
};
// Forgot thread
export const forgotPassword = async email => {
  try {
    const response = await apiInstance.post('/client/forgot-password', {email});
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        if (error.response.data.message === 'User not found') {
          throw new Error('Tài khoản này chưa được đăng ký.');
        }
        // Xử lý các thông báo lỗi khác nếu cần
        throw new Error(
          error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại.',
        );
      }
    }
    console.error(
      'Lỗi khi gửi OTP:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Ném lỗi để xử lý phía trên
  }
};
export const verifyOtp = async (email, otp) => {
  try {
    console.log('api', otp);
    console.log('api', email);
    // Chuyển đổi mã OTP thành chuỗi (phòng khi OTP là một mảng)
    const response = await apiInstance.post('/client/verify-otp', {
      email,
      otp: otp,
    });

    return response.data; // Trả về dữ liệu phản hồi
  } catch (error) {
    console.error(
      'Lỗi khi xác thực OTP:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Ném lỗi để xử lý phía trên
  }
};
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await apiInstance.post('/client/reset-password', {
      email,
      newPassword,
    }); // Đảm bảo endpoint đúng

    console.log(
      response.data.message || 'Đặt lại mật khẩu thành công!',
      'Thông báo thành công',
    );
    return response.data;
  } catch (error) {
    console.error(
      'Lỗi khi đặt lại mật khẩu:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Ném lỗi để xử lý phía trên
  }
};
// User cart, order management
export const getUserInfo = async (id, token) => {
  try {
    const url = `https://app-datn-gg.onrender.com/api/v1/client/${id}`; // Updated URL
    console.log('Fetching user info from URL:', url);
    console.log('Authorization token:', token);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};
export const changePassword = async (form, token) => {
  try {
    // Sending a POST request to change the password
    const response = await apiInstance.post(
      `/client/change-password`, // Endpoint with userId
      {
        currentPassword: form.currentPassword, // Include current password
        newPassword: form.newPassword, // Include new password
        userId: form.userId, // Include userId in the body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with Bearer token
          'Content-Type': 'application/json', // Make sure the content type is set to JSON
        },
      },
    );
    return response.data; // Return response data if needed
  } catch (error) {
    console.error('Error changing password:', error);
    throw new Error('Password change failed'); // Propagate the error
  }
};

// Assuming this is the structure of your API call
export const uploadAvatar = async (userId, formData, token) => {
  try {
    const response = await axios.put(
      `https://app-datn-gg.onrender.com/api/v1/client/uploadAvatar/${userId}`, // Use the correct endpoint with userId
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // Ensure the response structure matches your expectations
    if (response && response.data) {
      return response.data; // Return the data directly
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error; // Propagate error to the caller
  }
};

export const submitOrder = async (
  orderItems,
  paymentMethob,
  userId,
  shippingAddress,
  restaurant,
  status,
  transactionId,
  token,
) => {
  try {
    const payload = {
      orderItems,
      paymentMethob: paymentMethob,
      userId,
      shippingAddress,
      status,
      transactionId,
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

export const createPayment = async (paymentData, token) => {
  try {
    const response = await apiInstance.post(
      '/payment/create-payment',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Payment response:', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error creating payment: ' + error.message);
  }
};

// 2. Get Payment Info
export const getPaymentInfo = async (id, token) => {
  try {
    const response = await apiInstance.get(`/payment/payment-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('data', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error getting payment info: ' + error.message);
  }
};

// 3. Cancel Payment
export const cancelPayment = async (id, token) => {
  try {
    const response = await apiInstance.post(
      `/payment/payment-cancel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error canceling payment: ' + error.message);
  }
};

// 4. Webhook (handle payment status updates from the provider)
export const handleWebhook = async (webhookData, token) => {
  try {
    const response = await apiInstance.post('/webhook', webhookData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error handling webhook: ' + error.message);
  }
};

export const updateUserCart = async (id, token, cartId, updateFields) => {
  try {
    const response = await apiInstance.put(
      `/client/${id}/cart/${cartId}`,
      {
        updateFields, // Sends the fields to update (e.g., quantity, size, excluded items)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Return the updated data
  } catch (err) {
    console.error('Error updating cart item:', err); // Log error response
    throw err; // Rethrow the error for further handling
  }
};
export const removeUserCartItem = async (id, token, cartId) => {
  try {
    const response = await apiInstance.delete(`/client/${id}/cart/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Removing cart item response:', response.data); // Log full response
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error removing cart item:', error); // Log any errors
    throw error; // Rethrow the error for further handling
  }
};
export const clearCart = async (id, token) => {
  try {
    const response = await apiInstance.delete(`/client/${id}/cart`, {
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
// User registration
export const register = async form => {
  try {
    // Sending POST request to register endpoint with user data
    const response = await apiInstance.post('/users/register', form);

    console.log('Registration response:', response.data); // Log response data for debugging

    return response.data; // Return response data
  } catch (error) {
    console.error('Error during registration:', error); // Log errors
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error; // Rethrow error for handling in calling function
  }
};
export const verifyEmail = async (email, otp, password) => {
  try {
    const response = await apiInstance.post(
      'https://app-datn-gg.onrender.com/api/v1/users/verify-email',
      {
        email: email,
        otp: otp,
        password: password,
      },
    );
    console.log('Verification success:', response.data);
    // Navigate to the next screen upon successful verification
  } catch (error) {
    console.error('Verification failed:', error.response.data);
  }
};
export const getNearestBranch = async cordinate => {
  try {
    const response = await apiInstance.post(
      `/client/branch/nearest`,
      cordinate,
    ); // Send coordinates in body with POST
    console.log('Get nearest branch success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get nearest branch failed:', error);
  }
};
export const sendTransactions = async (token, transactionform) => {
  try {
    const response = await apiInstance.post(
      `/payment/transactions`,
      transactionform,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Transaction success:', response.data);
    // Navigate to the next screen upon successful transaction
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};
export const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};
