import nexmedis from "./nexmedis";
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from "#imports";
import { setAuthCookie } from "./cookies";

export const login = async (email: string, password: string) => {
	const response = await nexmedis.post(LOGIN_ENDPOINT, { email, password });
	console.log("itemku response.data", response.data);
	setAuthCookie(response.data);
	return response.data;
};

export const logout = async () => {
	await nexmedis.post(LOGOUT_ENDPOINT);
	localStorage.removeItem("token"); // Hapus token dari localStorage
};

export const fetchUser = async () => {
	const response = await nexmedis.get("/auth/user");
	return response.data;
};
