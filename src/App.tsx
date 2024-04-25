import { useState } from "react";
import "./App.css";
import FilterButton from "./components/FilterButton";
import SearchInput from "./components/SearchInput";
import UserCard from "./components/UserCard";

function App() {
	const [isChecked, setIsChecked] = useState(false);

	const handleToggle = () => {
		setIsChecked(!isChecked);
		console.log("isChecked ", isChecked);
	};
	return (
		<div className="flex items-center justify-center gap-4 m-5">
			<div className="bg-gray-200 p-10 w-[40%]">
				<h1>
					Hello, <span>Stella Maris</span>
				</h1>
				<p>Welcome to your dashboard, kindly sort through the user base</p>
				<SearchInput />
				<h4>Show Users</h4>
				<div className="grid grid-cols-3 gap-10">
					<FilterButton />
					<FilterButton />
					<FilterButton />
				</div>
			</div>
			<div className="bg-gray-300 p-8 w-[60%] rounded-3xl">
				<h2>All Users</h2>
				<div>
					<span>Filter by</span>
					<div className="flex justify-between items-center">
						<SearchInput />
						<SearchInput />
						<div className="flex items-center">
							<label className="relative flex justify-between items-center group p-2 text-xl">
								<input
									type="checkbox"
									checked={isChecked}
									onChange={handleToggle}
									className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
								/>
								<span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
							</label>
							<span>Show Country</span>
						</div>
					</div>
				</div>

				{/* Display Users */}
				<div className="flex flex-col gap-3 my-4">
					<UserCard />
					<UserCard />
					<UserCard />
				</div>
			</div>
		</div>
	);
}

export default App;
