import { IUser } from "./types";

type FilteredUserArgs = {
	data: IUser[] | null;
	searchQuery: string;
	selectedFilter: string;
	selectedCountry: { country: string } | null;
};

export const filteredUsers = ({ data, searchQuery, selectedFilter, selectedCountry }: FilteredUserArgs) => {
	let filteredData = data || [];
	if (searchQuery) {
		filteredData = filteredData.filter((item) => item?.name?.first.toLowerCase().includes(searchQuery.toLowerCase()));
	}
	if (selectedFilter !== "all") {
		filteredData = filteredData.filter((item) => item.gender === selectedFilter);
	}
	if (selectedCountry?.country) {
		filteredData = filteredData.filter((item) => item.location.country === selectedCountry.country);
	}
	return filteredData;
};
