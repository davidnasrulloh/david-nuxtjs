import nexmedis from "./nexmedis";
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from "#imports";
import { removeCredential, setAuthCookie } from "./cookies";

export const login = async (email: string, password: string) => {
	const response = await nexmedis.post(LOGIN_ENDPOINT, { email, password });
	setAuthCookie(response.data);
	return response.data;
};

export const logout = async () => {
	await nexmedis.post(LOGOUT_ENDPOINT);
	removeCredential();
};
