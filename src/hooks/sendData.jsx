
import axiosInstance from "../config/axios";


export const  sendData = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        console.log('Data sent:', response);
        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

export const  getData = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        console.log('Data sent:', response);
        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

