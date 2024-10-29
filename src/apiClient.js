import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://app-datn-gg.onrender.com/api/v1/users'; // URL API của bạn

// Hàm đăng nhập người dùng
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, { email, password });
        const token = response.data.token;

        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem('userToken', token);

        return response.data; // Trả về dữ liệu phản hồi từ API
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý phía trên
    }
};

// Hàm lấy token từ AsyncStorage
export const getToken = async () => {
    return await AsyncStorage.getItem('userToken');
};

// Hàm quên mật khẩu
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${apiUrl}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gửi OTP:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý phía trên
    }
};

// Hàm xác thực OTP
export const verifyOtp = async (email, otp) => {
    try {
        const response = await axios.post(`${apiUrl}/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xác thực OTP:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý phía trên
    }
};

// Hàm đặt lại mật khẩu mới
export const resetPassword = async (email, newPassword) => {
    try {
        const response = await axios.post(`${apiUrl}/forgot-password`, { email, newPassword });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi đặt lại mật khẩu:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý phía trên
    }
};

// Hàm đăng xuất
export const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem('userToken'); // Xóa token khỏi AsyncStorage
        // Có thể thực hiện thêm các bước khác nếu cần
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error.message);
    }
};
