import { MouseEventHandler } from "react";
import { FaUsers } from "react-icons/fa6";
import { FaFemale, FaMale } from "react-icons/fa";

interface FilterButtonProps {
	isActive: boolean;
	onClick: MouseEventHandler<HTMLDivElement>;
	name: string;
	bgColor: string;
}

const FilterButton = ({ isActive, onClick, name, bgColor }: FilterButtonProps) => {
	const buttonStyle = {
		backgroundColor: bgColor,
	};
	return (
		<div data-testid={name} className={`flex flex-col text-center cursor-pointer ${isActive ? "text-[#75D6D1]" : "text-gray-500"}`} onClick={onClick}>
			<div className={`w-25 h-20 rounded-xl flex flex-col justify-center items-center`} style={buttonStyle}>
				<span className="text-4xl text-white">{name === "All users" ? <FaUsers /> : name === "Male users" ? <FaMale /> : <FaFemale />}</span>
			</div>
			<p className="text-xs font-thin mt-3">{name}</p>
		</div>
	);
};

export default FilterButton;
