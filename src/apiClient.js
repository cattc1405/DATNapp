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
