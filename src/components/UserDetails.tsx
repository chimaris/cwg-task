import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineMailOutline, MdPhoneInTalk } from "react-icons/md";

const UserDetails = () => {
	return (
		<div className="p-4 w-100 bg-transparent mt-5 mb-10">
			<button className="flex items-center text-4xl">
				<FaArrowLeft className="12px" />
				<span className="text-[14px]">Results</span>
			</button>
			<div className="flex flex-col md:flex-row justify-center items-center gap-10">
				<span className="bg-[#4F6FB8] rounded-full w-50 h-50 text-white font-bold text-xs flex items-center justify-center overflow-hidden border-4 border-[#75D6D1]">
					<img className="w-100 h-100" src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" />
				</span>
				<div className="flex-1 flex-col justify-center md:justify-start md:text-left gap-5">
					<h1 className="text-[20px] font-bold text-[#000000DE]">Miss Brittany Mcdonalid 78</h1>
					<span className="text-[15px] font-thin italic text-[#000000DE] mt-3">5285, Ely, Shropshire, </span>

					<span className="flex items-center gap-1 text-[#262a41] ">
						<MdOutlineMailOutline />
						<span className="opacity-[0.6] text-xs">wendumaris@gmail.com</span>
					</span>
					<span className="opacity-[0.6] text-xs">Joined: 4949399939939</span>

					<span className="flex items-center gap-1 text-[#262a41]">
						<MdPhoneInTalk />
						<span className="opacity-[0.6] text-xs">4949399939939</span>
					</span>
					<span className="opacity-[0.6] text-xs">4949399939939</span>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
