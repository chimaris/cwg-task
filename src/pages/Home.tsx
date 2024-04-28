import { useState } from "react";
import { useQuery } from "react-query";

import { getUsers } from "../services/api/userApi";
import FilterSection from "../components/FilterSection";
import SearchInput from "../components/SearchInput";
import UserCard, { IUser } from "../components/UserCard";
import Pagination from "../components/Pagination";
import SelectInput from "../components/SelectInput";
import DownloadCSV from "../components/DownloadCsv";
import UserDetails from "../components/UserDetails";
import { useUser } from "../store/userContext";
import { motion } from "framer-motion";

function Home() {
	const [isChecked, setIsChecked] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedFilter, setSelectedFilter] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);

	const { showDetails } = useUser();

	const { data, isLoading, isError } = useQuery("users", getUsers, { staleTime: 1000 * 60 * 60 * 1, cacheTime: 1000 * 60 * 60 * 4 });

	// Filter Logic
	const filteredUsers = () => {
		let filteredData = data || [];
		if (searchQuery) {
			filteredData = filteredData.filter((item: IUser) => item?.name?.first.toLowerCase().includes(searchQuery.toLowerCase()));
		}
		if (selectedFilter !== "all") {
			filteredData = filteredData.filter((item: IUser) => item.gender === selectedFilter);
		}
		return filteredData;
	};

	const totalUsers = filteredUsers()?.length || 0;
	const usersPerPage = 3;

	const onPageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleSearchChange = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const handleFilterChange = (filterOption: string) => {
		setSelectedFilter(filterOption);
		setCurrentPage(1);
	};

	const handleToggle = () => {
		setIsChecked(!isChecked);
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Something happened</div>;

	return (
		<div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:m-5">
			<div className="p-10 w-100 md:w-[45%] text-white flex flex-col gap-4 text-center md:text-left">
				<h1 data-testid="name" className="text-[30px] font-thin">
					Hello, <span className="font-bold">Stella Maris</span>
				</h1>
				<p className="font-thin text-[12px]">Welcome to your dashboard, kindly sort through the user base</p>
				<SearchInput value={searchQuery} onChange={handleSearchChange} style="rounded-full bg-[#7D7F8C]" />
				<FilterSection onFilterChange={handleFilterChange} />
			</div>
			<div className="bg-[#F7F7FE] p-8 w-100 md:w-[55%] rounded-3xl">
				<h2 className="text-[#30344A] text-[22px] font-bold text-center md:text-left">All Users</h2>
				<div>
					<span className="text-[#000000DE] text-xs text-center md:text-left mb-20">Filter by</span>
					<div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
						<SearchInput value={searchQuery} onChange={handleSearchChange} style="rounded-full bg-[#E7E7EE]" />
						<div className="flex items-center">
							<SelectInput />
							<div className="flex items-center">
								<label className="relative flex justify-between items-center group p-2 text-xl">
									<input
										data-testid="toggle-country"
										type="checkbox"
										checked={isChecked}
										onChange={handleToggle}
										className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
									/>
									<span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-[#50BBB5] after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
								</label>
								<span>Show Country</span>
							</div>
						</div>
					</div>
				</div>
				{/* Display Users */}
				{/* {totalUsers > 0 && !showDetails && (
					<div className="flex flex-col gap-3 my-4">
						{filteredUsers()
							.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
							.map((user: IUser, index: number) => (
								<UserCard user={user} key={index} showCountry={isChecked} />
							))}
					</div>
				)} */}
				{/* Display Users Details */}
				{/* {showDetails && <UserDetails />} */}
				<motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }}>
					{/* Display Users */}
					{totalUsers > 0 && !showDetails && (
						<div className="flex flex-col gap-3 my-4">
							{filteredUsers()
								.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
								.map((user: IUser, index: number) => (
									<UserCard user={user} key={index} showCountry={isChecked} />
								))}
						</div>
					)}

					{/* Display Users Details */}
					{showDetails && (
						<motion.div
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.5 }}>
							<UserDetails />
						</motion.div>
					)}
				</motion.div>
				;{/* Pagination */}
				<div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-5 md:gap-0">
					<DownloadCSV data={filteredUsers()} disabled={showDetails} />
					<Pagination
						totalUsers={totalUsers}
						usersPerPage={usersPerPage}
						currentPage={currentPage}
						onPageChange={onPageChange}
						disabled={showDetails}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
