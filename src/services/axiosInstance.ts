import axios from "axios";

const BASE_URL = "https://randomuser.me/api/";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
