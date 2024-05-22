import axios from 'axios';

const baseUrl = 'http://localhost:3000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTkzMTFlMTQyYTMyNTE5ODQzZTFiZSIsImlhdCI6MTcwOTc4MTMzMCwiZXhwIjoxNzE3NTU3MzMwfQ.MZ7sPwxfzCCY_ukYNFKHj5s9YZ_WEGppSWxpxwYkxRM';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    },
});

const axiosInstancenotoken = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export { axiosInstancenotoken };
export default axiosInstance;
