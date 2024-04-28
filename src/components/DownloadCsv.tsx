import { MdOutlineCloudDownload } from "react-icons/md";
import { IUser } from "../helpers/types";

interface DownloadCSVProps {
	data: IUser[];
	disabled: boolean;
}

const DownloadCSV = ({ data, disabled }: DownloadCSVProps) => {
	const handleExport = () => {
		// Prepare CSV content
		const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(convertToCSV(data));

		// Create a temporary anchor element
		const link = document.createElement("a");
		link.setAttribute("href", csvContent);
		link.setAttribute("download", "users.csv");
		document.body.appendChild(link);

		// Trigger the click event on the anchor element
		link.click();

		// Remove the temporary anchor element
		document.body.removeChild(link);
	};

	const convertToCSV = (data: IUser[]) => {
		const headers = Object.keys(data[0]) as (keyof IUser)[];

		// Convert data to CSV rows
		const rows = data.map((obj) => {
			return headers
				.map((header) => {
					const value = obj[header];
					if (typeof value === "object" && value !== null) {
						return JSON.stringify(value);
					} else {
						return value;
					}
				})
				.join(",");
		});

		return [headers.join(","), ...rows].join("\n");
	};

	return (
		<button
			disabled={disabled}
			onClick={handleExport}
			className="bg-[#7946c1] text-white rounded-full flex items-center gap-1 px-4 py-3 hover:bg-[#8046c1] shadow-2xl transition-all ease-in-out disabled:opacity-50">
			<MdOutlineCloudDownload className="text-[24px]" />
			<span className="text-[14px]">Download Results</span>
		</button>
	);
};

export default DownloadCSV;
