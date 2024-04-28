import { MdOutlineCloudDownload } from "react-icons/md";

interface IDataItem {
	[key: string]: string | number | boolean | object | null;
}

interface DownloadCSVProps {
	data: IDataItem[];
	disabled: boolean;
}

const DownloadCSV = ({ data, disabled }: DownloadCSVProps) => {
	const handleExport = () => {
		// Prepare CSV content
		const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(convertToCSV(data));

		// Create a temporary anchor element
		const link = document.createElement("a");
		link.setAttribute("href", csvContent);
		link.setAttribute("download", "export.csv");
		document.body.appendChild(link);

		// Trigger the click event on the anchor element
		link.click();

		// Remove the temporary anchor element
		document.body.removeChild(link);
	};

	// Function to convert data to CSV format
	const convertToCSV = (data: IDataItem[]) => {
		const headers = Object.keys(data[0]);

		// Convert data to CSV rows
		const rows = data.map((obj) => {
			return headers
				.map((header) => {
					// Check if the value is an object
					if (typeof obj[header] === "object" && obj[header] !== null) {
						return JSON.stringify(obj[header]);
					} else {
						return obj[header];
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
