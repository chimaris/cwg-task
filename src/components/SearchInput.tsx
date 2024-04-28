import React from "react";
import { FaSearch } from "react-icons/fa";
import { useUser } from "../store/userContext";

interface SearchInputProps {
	style?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ style }) => {
	const { searchQuery, setSearchQuery, setCurrentPage } = useUser();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	return (
		<div className="relative">
			<input
				type="text"
				className={`border border-[#C7C7C7] px-4 py-4 pl-10 w-full ${style}`}
				placeholder="Find a user"
				value={searchQuery}
				onChange={handleInputChange}
			/>
			<FaSearch className="absolute top-0 left-0 mt-5 ml-3 h-4 w-4 text-[#979797] pointer-events-none" />
		</div>
	);
};

export default SearchInput;
