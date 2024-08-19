export interface IListUser {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: UserItem[];
	support: Support;
}

export interface UserItem {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

export interface Support {
	url: string;
	text: string;
}
