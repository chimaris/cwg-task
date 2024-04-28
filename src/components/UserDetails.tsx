import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineMailOutline, MdPhoneInTalk } from "react-icons/md";
import { useUser } from "../store/userContext";

const UserDetails = () => {
	const { currentUser, setShowDetails } = useUser();

	return (
		<section className="p-4 w-100 bg-transparent mt-5 mb-10">
			<button
				className="flex items-center justify-between mb-5 text-4xl gap-3 px-4 rounded-md hover:bg-[#E6E6EC] cursor-pointer"
				onClick={() => setShowDetails(false)}>
				<FaArrowLeft className="text-sm text-[#75D6D1]" />
				<span className="text-[14px] text-[#000000DE]">RESULTS</span>
			</button>
			<div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10">
				<span className="rounded-full w-52 h-52 text-white font-bold text-xs flex items-center justify-center overflow-hidden border-[6px] border-[#75D6D1]">
					<img className="w-full h-full " loading="lazy" src={currentUser?.picture.large} alt={currentUser?.name.first} />
				</span>
				<div className="flex-1">
					<div className="flex flex-col justify-center md:justify-start text-center md:text-left gap-3">
						<h1 className="text-[23px] font-bold text-[#000000DE]">
							{`${currentUser?.name.title} ${currentUser?.name.first} ${currentUser?.name.last}`}{" "}
							<span className="text-[#30344A] font-thin ml-1">{currentUser?.dob.age}</span>
						</h1>
						<span className="text-[15px] text-[#000000DE]">
							{currentUser?.location.street.number} {currentUser?.location.street.name}, {currentUser?.location.city},{" "}
							<span>{currentUser?.location.country}</span>
						</span>

						<span className="flex items-center gap-1 text-[#262a41] rounded-3xl bg-[#D9D9DF] w-fit py-2 px-4 mx-auto md:mx-0 ">
							<MdOutlineMailOutline />
							<span className="opacity-[0.6] text-sm md:text-base">{currentUser?.email}</span>
						</span>
						<span className="opacity-[0.6] text-sm md:text-base rounded-3xl bg-[#E6CBE4] w-fit py-2 px-4 mx-auto md:mx-0">
							Joined: {currentUser?.registered.date}
						</span>

						<span className="flex items-center gap-1 text-[#BABDD1] text-sm mx-auto md:mx-0">
							<MdPhoneInTalk className="text-2xl" />
							{currentUser?.phone}
						</span>
						<span className=" text-sm text-[#BABDD1]">{currentUser?.cell}</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserDetails;
