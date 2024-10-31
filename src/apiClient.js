import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://app-datn-gg.onrender.com/api/v1/users'; // URL API của bạn

// Tạo một instance của axios với interceptor
const axiosInstance = axios.create({
    baseURL: apiUrl,
});

// Interceptor để thêm token vào mỗi yêu cầu
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken'); // Lấy token từ AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Thêm token vào tiêu đề
        } else {
            console.warn('Token không có trong AsyncStorage.'); // Cảnh báo nếu token không tồn tại
        }
        return config;
    },  
    (error) => Promise.reject(error)
);

// Hàm đăng nhập người dùng
export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        const token = response.data.token;

        if (token) {
            await AsyncStorage.setItem('userToken', token); // Lưu token vào AsyncStorage
            console.log('Token đã lưu:', token); // Log token đã lưu
        } else {
            throw new Error('Không có token trong phản hồi.'); // Xử lý khi không có token
        }

        return response.data; // Trả về dữ liệu phản hồi từ API
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý phía trên
    }
};

// Hàm quên mật khẩu
export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/forgot-password', { email });
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                if (error.response.data.message === "User not found") {
                    throw new Error("Tài khoản này chưa được đăng ký.");
                }
                // Xử lý các thông báo lỗi khác nếu cần
                throw new Error(error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        }
        console.error('Lỗi khi gửi OTP:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý phía trên
    }
};

// Hàm xác thực OTP
export const verifyOtp = async (email, otp) => {
    try {
        const response = await axiosInstance.post('/verify-otp', { email, otp });
        return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        console.error('Lỗi khi xác thực OTP:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý phía trên
    }
};

// Hàm đặt lại mật khẩu mới
export const resetPassword = async (email, newPassword) => {
    try {
        const response = await axiosInstance.post('/reset-password', { email, newPassword }); // Đảm bảo endpoint đúng
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
        console.log('Đăng xuất thành công, đã xóa token.'); // Log thông báo đăng xuất
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error.message);
    }
};

// Hàm kiểm tra token
export const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Lấy token từ AsyncStorage
    if (token) {
        console.log('Current stored token:', token); // Log token hiện tại
        return token;
    } else {
        console.log('Không tìm thấy token.'); // Log nếu không tìm thấy token
        return null;
    }
};
