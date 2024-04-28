import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
	totalUsers: number;
	usersPerPage: number;
	currentPage: number;
	onPageChange: (pageNumber: number) => void;
	disabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ totalUsers, usersPerPage, currentPage, onPageChange, disabled }) => {
	const totalPages = Math.ceil(totalUsers / usersPerPage);
	const startIndex = (currentPage - 1) * usersPerPage + 1;
	const endIndex = Math.min(currentPage * usersPerPage, totalUsers);

	const handlePageChange = (pageNumber: number) => {
		onPageChange(pageNumber);
	};

	return (
		<div className="flex items-center gap-5">
			<div className="text-[#7B7B7B]">
				{startIndex} - {endIndex} of {totalUsers}
			</div>
			<div className="flex space-x-2">
				<button
					className={`px-3 py-3 rounded disabled:opacity-50 ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-[#23273C] text-white"}`}
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1 || disabled}>
					<FaChevronLeft />
				</button>
				<button
					className={`px-3 py-3 rounded disabled:opacity-50 ${
						currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-[#23273C] text-white"
					}`}
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages || disabled}>
					<FaChevronRight />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
