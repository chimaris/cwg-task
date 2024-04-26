import { useState } from "react";
import FilterButton from "./FilterButton";

interface FilterSectionProps {
	onFilterChange: (filterOption: string) => void;
}

function FilterSection({ onFilterChange }: FilterSectionProps) {
	const [selectedFilter, setSelectedFilter] = useState("all");

	const handleFilterChange = (filterOption: string) => {
		setSelectedFilter(filterOption);
		onFilterChange(filterOption);
	};

	return (
		<div className="mt-10">
			<h4>Show Users</h4>
			<div className="grid grid-cols-3 gap-10 mt-4">
				<FilterButton onClick={() => handleFilterChange("all")} isActive={selectedFilter === "all"} name="All users" bgColor="#EC47A9" />
				<FilterButton onClick={() => handleFilterChange("male")} isActive={selectedFilter === "male"} name="Male users" bgColor="#50BBB5" />
				<FilterButton onClick={() => handleFilterChange("female")} isActive={selectedFilter === "female"} name="Female users" bgColor="#7443B9" />
			</div>
		</div>
	);
}

export default FilterSection;
