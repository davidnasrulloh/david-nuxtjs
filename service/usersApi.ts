import nexmedis from "./nexmedis";
import { GET_USERS_ENDPOINT } from "~/utils/endpoint";

export const getUserList = async (page: number) => {
	const response = await nexmedis.get(`${GET_USERS_ENDPOINT}?page=${page}`);
	return response.data;
};

export const getUserById = async (id: string) => {
	const response = await nexmedis.get(`${GET_USERS_ENDPOINT}/${id}`);
	return response.data;
};
