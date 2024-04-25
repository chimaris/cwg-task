import React from "react";
import { FaAnchorCircleCheck } from "react-icons/fa6";

const FilterButton = () => {
	return (
		<div className="flex flex-col text-center">
			<div className="w-25 h-20 bg-red-600 rounded-xl flex flex-col justify-center items-center">
				<FaAnchorCircleCheck />
			</div>
			<p>All users</p>
		</div>
	);
};

export default FilterButton;
