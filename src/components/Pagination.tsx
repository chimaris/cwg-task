import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage + 1;
	const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

	const handlePageChange = (pageNumber: number) => {
		onPageChange(pageNumber);
	};

	return (
		<div className="flex items-center gap-5">
			<div className="text-[#7B7B7B]">
				{startIndex} - {endIndex} of {totalItems}
			</div>
			<div className="flex space-x-2">
				<button
					className={`px-3 py-3 rounded ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-[#23273C] text-white"}`}
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}>
					<FaChevronLeft />
				</button>
				<button
					className={`px-3 py-3 rounded ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-[#23273C] text-white"}`}
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}>
					<FaChevronRight />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
