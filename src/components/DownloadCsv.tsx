import { MdOutlineCloudDownload } from "react-icons/md";

interface DataItem {
	[key: string]: string | number | boolean | object | null;
}

interface DownloadCSVProps {
	data: DataItem[];
}

const DownloadCSV = ({ data }: DownloadCSVProps) => {
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
	const convertToCSV = (data) => {
		// Get the headers
		const headers = Object.keys(data[0]);

		// Convert data to CSV rows
		const rows = data.map((obj) => {
			return headers
				.map((header) => {
					// Check if the value is an object
					if (typeof obj[header] === "object" && obj[header] !== null) {
						// Convert the object to a string
						return JSON.stringify(obj[header]);
					} else {
						// Convert non-object values to string
						return obj[header];
					}
				})
				.join(",");
		});

		return [headers.join(","), ...rows].join("\n");
	};

	return (
		<button
			onClick={handleExport}
			className="bg-[#7946c1] text-white rounded-full flex items-center gap-1 px-4 py-3 hover:bg-[#8046c1] shadow-2xl transition-all ease-in-out">
			<MdOutlineCloudDownload className="text-[24px]" />
			<span className="text-[14px]">Download Results</span>
		</button>
	);
};

export default DownloadCSV;
