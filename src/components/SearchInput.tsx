import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
	value: string;
	onChange: (query: string) => void;
	style?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, style }) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="relative">
			<input
				type="text"
				className={`border border-[#C7C7C7] px-4 py-4 pl-10 w-full ${style}`}
				placeholder="Find a user"
				value={value}
				onChange={handleInputChange}
			/>
			<FaSearch className="absolute top-0 left-0 mt-5 ml-3 h-4 w-4 text-[#979797] pointer-events-none" />
		</div>
	);
};

export default SearchInput;
