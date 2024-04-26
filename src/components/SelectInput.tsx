import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola"];

const SelectInput = () => {
	const [selectedCountry, setSelectedCountry] = useState("");

	const handleChange = (e) => {
		setSelectedCountry(e.target.value);
	};

	return (
		<div className="relative">
			<select
				value={selectedCountry}
				onChange={handleChange}
				className="block appearance-none w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
				<option value="" disabled>
					Select a country
				</option>
				{countries.map((country, index) => (
					<option key={index} value={country}>
						{country}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<FiChevronDown />
			</div>
		</div>
	);
};

export default SelectInput;
