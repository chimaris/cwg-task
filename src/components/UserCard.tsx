import React from "react";
import { MdOutlineMailOutline, MdPhoneInTalk, MdArrowForward } from "react-icons/md";
import { useUser } from "../store/userContext";

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
}

interface UserCardProps {
	user: IUser;
	showCountry: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, showCountry }) => {
	const { name, email, phone, location, picture } = user;
	const { setCurrentUser, setShowDetails } = useUser();

	const handleClick = () => {
		setCurrentUser(user);
		setShowDetails(true);
	};

	return (
		<div className="flex flex-col md:flex-row justify-center items-center gap-5 rounded shadow-2xl bg-white p-4 w-100">
			<span className="bg-[#4F6FB8] rounded-full w-20 h-20 text-white font-bold text-xs flex items-center justify-center overflow-hidden border-4 border-[#75D6D1]">
				<img className="w-100 h-100" src={picture?.medium} alt="User" />
			</span>
			<div className="md:flex-1 justify-center md:justify-start text-center md:text-left">
				<h1 className="text-[20px] font-bold text-[#000000DE]">{`${name?.first} ${name?.last}`}</h1>
				<span className="text-[15px] font-thin italic text-[#000000DE] mt-3">
					{location?.street.number} {location?.street.name}, {location?.city}, {showCountry && location?.country}
				</span>

				<div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3 md:gap-0">
					<span className="flex items-center gap-1 text-[#262a41] ">
						<MdOutlineMailOutline />
						<span className="opacity-[0.6] text-xs">{email}</span>
					</span>
					<span className="flex items-center gap-1 text-[#262a41]">
						<MdPhoneInTalk />
						<span className="opacity-[0.6] text-xs">{phone}</span>
					</span>
					<button
						onClick={handleClick}
						className="bg-[#75D6D1] text-white h-[50px] w-[50px] font-bold rounded-2xl flex flex-col justify-center items-center hover:bg-[#50BBB5] shadow-2xl transition-all ease-in-out">
						<MdArrowForward />
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
