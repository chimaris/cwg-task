import { useUser } from "../store/userContext";
import SearchInput from "./SearchInput";
import SelectInput from "./SelectInput";

interface FilterBySearchProps {
	text: string;
}

function FilterBySearch({ text }: FilterBySearchProps) {
	const { showCountry, setShowCountry } = useUser();

	const handleToggle = () => {
		setShowCountry(!showCountry);
	};

	return (
		<div>
			<h2 className="text-[#30344A] text-[22px] font-bold text-center md:text-left">{text}</h2>
			<div>
				<span className="text-[#000000DE] text-xs text-center md:text-left">Filter by</span>
				<div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 mt-3">
					<SearchInput style="rounded-full bg-[#E7E7EE]" />
					<div className="flex items-center">
						<SelectInput />
						<div className="flex items-center">
							<label className="relative flex justify-between items-center group p-2 text-xl">
								<input
									data-testid="toggle-country"
									type="checkbox"
									checked={showCountry}
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
		</div>
	);
}

export default FilterBySearch;
