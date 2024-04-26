import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineMailOutline, MdPhoneInTalk } from "react-icons/md";
import { useUser } from "../store/userContext";
import { motion } from "framer-motion";

const UserDetails = () => {
	const { currentUser, setShowDetails } = useUser();

	return (
		<motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
			<div className="p-4 w-100 bg-transparent mt-5 mb-10">
				<button
					className="flex items-center justify-between my-5 text-4xl gap-3 px-4 rounded-md hover:bg-[#E6E6EC] cursor-pointer"
					onClick={() => setShowDetails(false)}>
					<FaArrowLeft className="text-sm text-[#75D6D1]" />
					<span className="text-[14px] text-[#000000DE]">RESULTS</span>
				</button>
				<div className="flex flex-col md:flex-row justify-center items-center gap-10">
					<span className="rounded-full w-50 h-50 text-white font-bold text-xs flex items-center justify-center overflow-hidden border-4 border-[#75D6D1]">
						<img className="w-100 h-100 " src={currentUser?.picture.large} alt={currentUser?.name.first} />
					</span>
					<div className="flex-1 ">
						<div className="flex flex-col justify-center md:justify-start md:text-left gap-3">
							<h1 className="text-[23px] font-bold text-[#000000DE]">
								{`${currentUser?.name.title} ${currentUser?.name.first} ${currentUser?.name.last}`}{" "}
								<span className="text-[#30344A] font-thin ml-1">{currentUser?.registered.age}</span>
							</h1>
							<span className="text-[15px] text-[#000000DE]">
								{currentUser?.location.street.number} {currentUser?.location.street.name}, {currentUser?.location.city},{" "}
								{currentUser?.location.country}
							</span>

							<span className="flex items-center gap-1 text-[#262a41] rounded-3xl bg-[#D9D9DF] w-fit py-2 px-4 ">
								<MdOutlineMailOutline />
								<span className="opacity-[0.6] text-xs">{currentUser?.email}</span>
							</span>
							<span className="opacity-[0.6] text-xs rounded-3xl bg-[#E6CBE4] w-fit py-2 px-4">Joined: {currentUser?.registered.date}</span>

							<span className="flex items-center gap-1 text-[#262a41]">
								<MdPhoneInTalk />
								<span className=" text-xs text-[#BABDD1]">{currentUser?.phone}</span>
							</span>
							<span className=" text-xs text-[#BABDD1]">{currentUser?.cell}</span>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default UserDetails;
