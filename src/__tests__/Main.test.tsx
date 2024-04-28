import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useQuery } from "react-query";
import { UserProvider } from "../store/userContext";
import { IUser } from "../components/UserCard";
import Home from "../pages/Home";

// Declaration for using the real data
// const mockUsers: IUser[] = [];

let maleFn = "Theo",
	maleLn = "Sims",
	femaleFn = "Enni",
	femaleLn = "Kilpela";

// Using local data
const mockUsers: IUser[] = [
	{
		gender: "male",
		name: { title: "Mr", first: "Theo", last: "Sims" },
		location: {
			street: { name: "", number: 48 },
			city: "Athenry",
			country: "Ireland",
		},
		email: "theo.sims@example.com",

		dob: { date: "1996-04-23T15:43:28.608Z", age: 28 },
		registered: { date: "2018-03-03T15:18:10.150Z", age: 6 },
		phone: "021-569-0021",
		cell: "081-789-3266",
		id: { name: "PPS", value: "9948900T" },
		picture: {
			large: "https://randomuser.me/api/portraits/men/57.jpg",
			medium: "https://randomuser.me/api/portraits/med/men/57.jpg",
			thumbnail: "https://randomuser.me/api/portraits/thumb/men/57.jpg",
		},
	},
	{
		gender: "female",
		name: { title: "Ms", first: "Enni", last: "Kilpela" },
		location: {
			street: { name: "", number: 48 },
			city: "Kokemäki",
			country: "Finland",
		},
		email: "enni.kilpela@example.com",
		dob: { date: "1993-10-27T02:12:57.883Z", age: 30 },
		registered: { date: "2013-01-07T09:02:10.946Z", age: 11 },
		phone: "09-358-685",
		cell: "045-600-48-89",
		id: { name: "HETU", value: "NaNNA448undefined" },
		picture: {
			large: "https://randomuser.me/api/portraits/women/68.jpg",
			medium: "https://randomuser.me/api/portraits/med/women/68.jpg",
			thumbnail: "https://randomuser.me/api/portraits/thumb/women/68.jpg",
		},
	},
];

// Mock the useQuery hook
jest.mock("react-query", () => ({
	...jest.requireActual("react-query"),
	useQuery: jest.fn(),
}));

beforeEach(() => {
	// Mock the implementation of useQuery
	(useQuery as jest.Mock).mockReturnValue({
		data: mockUsers,
		isLoading: false,
		isError: false,
	});
});

// renderHome component function
const renderHome = () => {
	return render(
		<UserProvider>
			<Home />
		</UserProvider>
	);
};

describe("Is Home component rendered successfully", () => {
	it("renders the component without crashing", () => {
		// renders the component
		renderHome();
	});

	it("Check if the welcome name is correct", () => {
		const { getByTestId } = renderHome();

		const name = getByTestId("name").textContent;
		expect(name).toBe("Hello, Stella Maris");
	});

	it("How many data is retrieved", async () => {
		renderHome();

		// Expect that the useQuery hook has been called with the correct arguments
		expect(useQuery).toHaveBeenCalledWith("users", expect.any(Function), {
			staleTime: 1000 * 60 * 60 * 1,
			cacheTime: 1000 * 60 * 60 * 4,
		});

		// Get the mock implementation of useQuery
		const mockUseQuery = useQuery as jest.Mock;

		// Assert that the useQuery hook has been called
		expect(mockUseQuery).toHaveBeenCalled();

		// Get the arguments passed to the useQuery hook
		const [, queryFn] = mockUseQuery.mock.calls[0];

		// Call the query function to simulate fetching data
		const data = await queryFn();

		// Check the length and properties of the data array
		expect(data).toHaveLength(9);
		expect(data[0]).toHaveProperty("gender");
		expect(data[0].location).toHaveProperty("country");

		// *** CODE BELOW CAN ENABLE IF I WANT TO TEST WITH REAL DATA (Data coming from API) *** //

		// // Concatenate the real data to mockUsers and reassign the values
		// mockUsers.push(...data);

		// // get the first male and female names and reassign the values
		// const findMale = mockUsers.find((user) => user.gender === "male");
		// const findFemale = mockUsers.find((user) => user.gender === "female");

		// maleFn = findMale?.name.first || "";
		// maleLn = findMale?.name.last || "";
		// femaleFn = findFemale?.name.first || "";
		// femaleLn = findFemale?.name.last || "";
	});
});

describe("Testing if all users displayed successfully", () => {
	it("Handles API error state", async () => {
		// Mock the useQuery hook to return an error
		(useQuery as jest.Mock).mockReturnValueOnce({
			data: undefined,
			isLoading: false,
			isError: true,
		});

		const { getByText } = renderHome();

		// Wait for error message to be displayed
		await waitFor(() => {
			expect(getByText("Something happened")).toBeInTheDocument();
		});
	});

	it("Handles API loading state", async () => {
		(useQuery as jest.Mock).mockReturnValueOnce({
			data: undefined,
			isLoading: true,
			isError: false,
		});

		const { getByText } = renderHome();

		// Wait for error message to be displayed
		await waitFor(() => {
			expect(getByText("Loading...")).toBeInTheDocument();
		});
	});

	it("Displays user cards with correct names", async () => {
		const { getByText } = renderHome();

		// Wait for user cards to be rendered
		await waitFor(() => {
			mockUsers.forEach((user) => {
				expect(getByText(`${user.name.first} ${user.name.last}`)).toBeInTheDocument();
			});
		});
	});

	it("Displays user details when clicking on a user card", async () => {
		const { getByText, getByTestId } = renderHome();

		// Wait for user cards to be rendered
		await waitFor(() => {
			// Click on the first user card to show details
			fireEvent.click(getByTestId("user-card-9948900T"));
		});

		// Wait for user details to be rendered
		await waitFor(() => {
			// Check if user details are displayed
			expect(getByText("RESULTS")).toBeInTheDocument();
			expect(getByText(`${mockUsers[0].name.title} ${mockUsers[0].name.first} ${mockUsers[0].name.last}`)).toBeInTheDocument();
			expect(getByText(`${mockUsers[0].dob.age}`)).toBeInTheDocument();
			expect(getByText(`${mockUsers[0].email}`)).toBeInTheDocument();
			expect(getByText(`${mockUsers[0].location.country}`)).toBeInTheDocument();
		});
	});
});

describe("Testing the Core Features of the page", () => {
	it("Allows searching for users by name", async () => {
		const { getAllByPlaceholderText, getByText, queryByText } = renderHome();

		const searchInputs = getAllByPlaceholderText("Find a user");

		// Select the desired input element (assuming it's the first one)
		const searchInput = searchInputs[0];

		// Simulate user typing in the search input
		fireEvent.change(searchInput, { target: { value: maleFn } });

		await waitFor(() => {
			expect(getByText(`${maleFn} ${maleLn}`)).toBeInTheDocument();
			expect(queryByText("random names")).not.toBeInTheDocument();
		});
	});

	it("Allows filtering users by male gender", async () => {
		const { getByText, getByTestId, queryByText } = renderHome();

		// Click on the filter option for male users.
		fireEvent.click(getByTestId("Male users"));

		// Wait for user cards to be rendered
		await waitFor(() => {
			expect(getByText(`${maleFn} ${maleLn}`)).toBeInTheDocument();
			expect(queryByText(`${femaleFn} ${femaleLn}`)).not.toBeInTheDocument();
		});

		// console.log("Document HTML after filter:", document.body.innerHTML);
	});

	it("Allows filtering users by female gender", async () => {
		const { getByText, getByTestId, queryByText } = renderHome();

		// Click on the filter option for female users.
		fireEvent.click(getByTestId("Female users"));

		// Wait for user cards to be rendered
		await waitFor(() => {
			expect(getByText(`${femaleFn} ${femaleLn}`)).toBeInTheDocument();
			expect(queryByText(`${maleFn} ${maleLn}`)).not.toBeInTheDocument();
		});
	});

	it("Allows filtering to display all users", async () => {
		const { getByText, getByTestId, queryByText } = renderHome();

		// Click on the filter option for all users.
		fireEvent.click(getByTestId("All users"));

		// Wait for user cards to be rendered
		await waitFor(() => {
			expect(getByText(`${femaleFn} ${femaleLn}`)).toBeInTheDocument();
			expect(queryByText(`${maleFn} ${maleLn}`)).toBeInTheDocument();
			expect(mockUsers.length).toStrictEqual(mockUsers.length);
		});
	});

	it("Toggles country information on user cards when checkbox is clicked", async () => {
		const { getByTestId, queryByText, getByText } = renderHome();

		// Check if country information is initially hidden
		expect(queryByText(`${mockUsers[0].location.country}`)).not.toBeInTheDocument();

		const checkbox = getByTestId("toggle-country") as HTMLInputElement;

		// Checkbox status before click
		expect(checkbox.checked).toBe(false);

		fireEvent.click(checkbox);

		// Checkbox status after click:
		expect(checkbox.checked).toBe(true);
		expect(getByText(`${mockUsers[0].location.country}`)).toBeInTheDocument();
	});
});
