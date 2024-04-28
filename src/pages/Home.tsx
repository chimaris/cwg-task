import { useState } from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useUser } from "../store/userContext";
import { getUsers } from "../services/api/userApi";
import { FilterBySearch, SearchInput, UserCard, FilterSection, Pagination, DownloadCSV, UserDetails } from "../components";
import { IUser } from "../types";

function Home() {
	const [selectedFilter, setSelectedFilter] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const { showDetails, searchQuery, setSearchQuery, isChecked, setIsChecked } = useUser();
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

			{/* Display Users */}
			<div className="bg-[#F7F7FE] p-8 w-100 md:w-[55%] rounded-3xl">
				{!showDetails && (
					<motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 1 }}>
						<FilterBySearch handleToggle={handleToggle} handleSearchChange={handleSearchChange} text="All Users" />
						<div className="flex flex-col gap-3 my-4">
							{totalUsers > 0 &&
								filteredUsers()
									.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
									.map((user: IUser, index: number) => <UserCard user={user} key={index} showCountry={isChecked} />)}
						</div>
						{/* Pagination */}
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
					</motion.div>
				)}

				{/* Display Users Details */}
				{showDetails && (
					<motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 1 }}>
						<FilterBySearch handleToggle={handleToggle} handleSearchChange={handleSearchChange} text="User List" />
						<UserDetails />

						{/* Pagination and Download Sections */}
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
					</motion.div>
				)}
			</div>
		</div>
	);
}

export default Home;
