export interface IUser {
	id: {
		name: string;
		value: string;
	};
	name: {
		first: string;
		last: string;
		title: string;
	};
	email: string;
	phone: string;
	location: {
		city: string;
		country: string;
		street: {
			name: string;
			number: number;
		};
	};
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
	gender: string;
	cell: string;
	registered: {
		age: number;
		date: string;
	};
	dob: {
		date: string;
		age: number;
	};
}
