import { useState } from "react";
import { useQuery } from "react-query";

import { getUsers } from "../services/api/userApi";
import FilterSection from "../components/FilterSection";
import SearchInput from "../components/SearchInput";
import UserCard, { IUser } from "../components/UserCard";
import Pagination from "../components/Pagination";
import SelectInput from "../components/SelectInput";
import { MdOutlineCloudDownload } from "react-icons/md";

function Main() {
	const [isChecked, setIsChecked] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedFilter, setSelectedFilter] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading, isError } = useQuery("users", getUsers, { enabled: true });

	// Filter Logic
	const filteredItems = () => {
		let filteredData = data || [];
		if (searchQuery) {
			filteredData = filteredData.filter((item: IUser) => item?.name?.first.toLowerCase().includes(searchQuery.toLowerCase()));
		}
		if (selectedFilter !== "all") {
			filteredData = filteredData.filter((item: IUser) => item.gender === selectedFilter);
		}
		return filteredData;
	};

	const totalItems = filteredItems()?.length || 0;
	const itemsPerPage = 3;

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
		<div className="flex items-center justify-center gap-4 m-5">
			<div className="p-10 w-[45%] text-white flex flex-col gap-4">
				<h1 className="text-[30px] font-thin">
					Hello, <span className="font-bold">Stella Maris</span>
				</h1>
				<p className="font-thin text-[12px]">Welcome to your dashboard, kindly sort through the user base</p>
				<SearchInput value={searchQuery} onChange={handleSearchChange} style="rounded-full bg-[#7D7F8C]" />
				<FilterSection onFilterChange={handleFilterChange} />
			</div>
			<div className="bg-[#F7F7FE] p-8 w-[55%] rounded-3xl">
				<h2 className="text-[#30344A] text-[22px] font-bold">All Users</h2>
				<div>
					<span className="text-[#000000DE] text-xs">Filter by</span>
					<div className="flex justify-between items-center">
						<SearchInput value={searchQuery} onChange={handleSearchChange} style="rounded-full bg-[#E7E7EE]" />
						<SelectInput />
						<div className="flex items-center">
							<label className="relative flex justify-between items-center group p-2 text-xl">
								<input
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

				{/* Display Users */}
				{totalItems > 0 && (
					<div className="flex flex-col gap-3 my-4">
						{filteredItems()
							.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
							.map((user: IUser, index: number) => (
								<UserCard user={user} key={index} showCountry={isChecked} />
							))}
					</div>
				)}

				{/* Pagination */}
				<div className="flex justify-between items-center mt-5">
					<button className="bg-[#7946c1] text-white rounded-full flex items-center gap-1 px-4 py-3 hover:bg-[#8046c1] shadow-2xl transition-all ease-in-out">
						<MdOutlineCloudDownload className="text-[24px]" />
						<span className="text-[14px]">Download Results</span>
					</button>
					<Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={onPageChange} />
				</div>
			</div>
		</div>
	);
}

export default Main;
