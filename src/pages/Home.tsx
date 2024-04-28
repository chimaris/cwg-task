import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useUser } from "../store/userContext";
import { getUsers } from "../services/api/userApi";
import { FilterBySearch, SearchInput, UserCard, Pagination, DownloadCSV, UserDetails, FilterByGender, Loading, ErrorCard } from "../components";
import { filteredUsers } from "../helpers/utils";
import { IUser } from "../helpers/types";

function Home() {
	const { showDetails, searchQuery, selectedFilter, currentPage, selectedCountry } = useUser();
	const { data, isLoading, isError } = useQuery("users", getUsers, { staleTime: 1000 * 60 * 60 * 1, cacheTime: 1000 * 60 * 60 * 4 });

	const filteredData = filteredUsers({ data, searchQuery, selectedFilter, selectedCountry });
	const totalUsers = filteredData.length || 0;
	const usersPerPage = 3;

	if (isLoading) return <Loading />;
	if (isError) return <ErrorCard />;

	return (
		<section className="grid grid-cols-1 lg:grid-cols-11 items-center justify-between md:gap-10 md:my-5 md:mx-10">
			<div className="w-full pr-5 pl-5 py-5 md:pl-12 text-white flex flex-col gap-4 text-center md:text-left col-span-5">
				<h1 data-testid="name" className="text-[30px] font-thin">
					Hello, <span className="font-bold">Stella Maris</span>
				</h1>
				<p className="font-thin text-[12px] w-[80%] md:w-full m-auto">Welcome to your dashboard, kindly sort through the user base</p>
				<SearchInput style="rounded-full bg-[#7D7F8C]" />
				<FilterByGender />
			</div>

			{/* Display Users */}
			<div className="bg-[#F7F7FE] w-full p-4 md:p-8 rounded-3xl col-span-6">
				{!showDetails && (
					<motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.5 }}>
						<FilterBySearch text="All Users" />

						<div className="flex flex-col gap-3 my-4">
							{totalUsers > 0 &&
								filteredData
									.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
									.map((user: IUser, index: number) => <UserCard user={user} key={index} />)}
						</div>
						{/* Pagination */}
						<div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-5 md:gap-0">
							<DownloadCSV data={filteredData} disabled={showDetails} />
							<Pagination totalUsers={totalUsers} usersPerPage={usersPerPage} />
						</div>
					</motion.div>
				)}
				{/* Display Users Details */}
				{showDetails && (
					<motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }}>
						<FilterBySearch text="User List" />
						<UserDetails />

						{/* Pagination and Download Sections */}
						<div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-5 md:gap-0">
							<DownloadCSV data={filteredData} disabled={showDetails} />
							<Pagination totalUsers={totalUsers} usersPerPage={usersPerPage} />
						</div>
					</motion.div>
				)}
			</div>
		</section>
	);
}

export default Home;
