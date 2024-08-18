import axios from "axios";
import { getToken } from "./cookies";

const nexmedis = axios.create({
	baseURL: "https://reqres.in/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Menambahkan token ke setiap permintaan jika ada
nexmedis.interceptors.request.use((config) => {
	const token = getToken();
	console.log("itemku token", token);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default nexmedis;
