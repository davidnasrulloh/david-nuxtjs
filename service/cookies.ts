import CryptoJS from "crypto-js";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const AUTH_KEY = `102901281928VHAKJSK_auth`;

/****** Function Cookie Setup ******/

function setCookie(cookieName: string, cookiePayload: any): void {
	const expiry = Date.now() + cookiePayload?.expires_in * 1000;
	const chiperText = CryptoJS.AES.encrypt(JSON.stringify(cookiePayload), "dave100$");
	document.cookie = `${cookieName}=${chiperText.toString()}; Expires=${new Date(expiry).toUTCString()}; Path=/; Secure; SameSite=Lax`;
}

function getCookie(cookieName: string, key: string = ""): string | void {
	if (!cookieName) return;
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${cookieName}=`));
	if (!cookies) return;

	const cookieValue = cookies.split("=")[1];
	const bytes = CryptoJS.AES.decrypt(cookieValue, "dave100$");

	if (bytes.toString(CryptoJS.enc.Utf8)) {
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		if (decryptedData[key]) return decryptedData[key];
		console.log("itemku decryptedData", decryptedData);
		return decryptedData;
	} else {
		return;
	}
}

function clearCookie(cookieName: string) {
	cookies.remove(cookieName, "/");
}

/****** Cookie Hooks ******/

// Set Cookie

export function setAuthCookie(payload: any): void {
	setCookie(AUTH_KEY, payload);
}

// Get Cookie

export function getToken(): string | void {
	return getCookie(AUTH_KEY, "token");
}

// Remove Cookie

export function removeCredential(): void {
	const router = useRouter();
	clearCookie(AUTH_KEY);
	router.push("/");
}
