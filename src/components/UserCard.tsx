import React from "react";

const UserCard = () => {
	return (
		<div className="flex gap-4 rounded shadow-lg bg-white p-4 w-100">
			<span className="bg-[#4F6FB8] rounded-full w-20 h-20 text-white font-bold text-xs flex items-center justify-center overflow-hidden border-4 border-[#75D6D1]">
				<img className="w-100 h-100" src="https://res.cloudinary.com/payhospi/image/upload/v1712605539/umoja/ceo.png" alt="name" />
			</span>
			<div className="flex-1">
				<h1>Franklin Cruz</h1>
				<span>Cambridge, Lincolnshire, Nigeria</span>

				<div className="flex justify-between items-center">
					<span>wendu@gmail.com</span>
					<span>+234 7066532289</span>
					<button className="bg-[#f00] p-3">Show</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
