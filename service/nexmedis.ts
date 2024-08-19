import axios from "axios";
import { getToken } from "./cookies";

const nexmedis = axios.create({
	baseURL: "https://reqres.in/api",
	headers: {
		"Content-Type": "application/json",
	},
});

nexmedis.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default nexmedis;
