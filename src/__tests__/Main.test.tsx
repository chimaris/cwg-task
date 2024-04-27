import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useQuery } from "react-query";
import { UserProvider } from "../store/userContext";
import { IUser } from "../components/UserCard";
import Main from "../pages/Main";

const maleFn = "Oliver",
	maleLn = "Li",
	femaleFn = "Jenny";
// femaleLn = "Garrett";

const mockUsers: IUser[] = [
	{
		id: {
			name: "ID",
			value: "1",
		},
		name: {
			first: maleFn,
			last: maleLn,
			title: "Mr",
		},
		email: "john.doe@example.com",
		phone: "123-456-7890",
		location: {
			city: "City",
			country: "Country",
			street: {
				name: "Street Name",
				number: 123,
			},
		},
		picture: {
			large: "large-image-url",
			medium: "medium-image-url",
			thumbnail: "thumbnail-image-url",
		},
		gender: "male",
		cell: "098-765-4321",
		registered: {
			age: 30,
			date: "2022-04-25",
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

// Setup function
const setup = () => {
	return render(
		<UserProvider>
			<Main />
		</UserProvider>
	);
};

describe("Testing the Main component", () => {
	it("demo", () => {
		expect(true).toBe(true);
	});

	it("renders the component without crashing", () => {
		// renders the component
		setup();
	});

	it("Check if the welcome name is correct", () => {
		const { getByTestId } = setup();

		const name = getByTestId("name").textContent;
		expect(name).toBe("Hello, Stella Maris");
	});

	it("How many data is retrieved", async () => {
		setup();

		// Expect that the useQuery hook has been called with the correct arguments
		expect(useQuery).toHaveBeenCalledWith("users", expect.any(Function), {
			staleTime: 1000 * 60 * 30,
			cacheTime: 1000 * 60 * 30,
		});

		// Get the mock implementation of useQuery
		const mockUseQuery = useQuery as jest.Mock;

		// Assert that the useQuery hook has been called
		expect(mockUseQuery).toHaveBeenCalled();

		// Get the arguments passed to the useQuery hook
		const [, queryFn] = mockUseQuery.mock.calls[0];

		// Call the query function to simulate fetching data
		const data = await queryFn();

		// Check the length of the data array
		expect(data).toHaveLength(9);
	});
});

describe("Testing the Core Features of the page", () => {
	it("Displays user cards with correct names", async () => {
		const { getByText } = setup();

		// Wait for user cards to be rendered
		await waitFor(() => {
			mockUsers.forEach((user) => {
				expect(getByText(`${user.name.first} ${user.name.last}`)).toBeInTheDocument();
			});
		});
	});

	it("Allows searching for users by name", async () => {
		const { getAllByPlaceholderText, getByText } = setup();

		const searchInputs = getAllByPlaceholderText("Find a user");

		// Select the desired input element (assuming it's the first one)
		const searchInput = searchInputs[0];

		// Simulate user typing in the search input
		fireEvent.change(searchInput, { target: { value: maleFn } });

		await waitFor(() => {
			expect(getByText(`${maleFn} ${maleLn}`)).toBeInTheDocument();
		});
	});

	it("Allows filtering users by male gender", async () => {
		const { getByText, getByTestId, queryByText } = setup();

		// Click on the filter option for male users.
		fireEvent.click(getByTestId("Male users"));

		// Wait for user cards to be rendered
		await waitFor(() => {
			expect(getByText(`${maleFn} ${maleLn}`)).toBeInTheDocument();
			expect(queryByText(`${femaleFn}`)).not.toBeInTheDocument();
		});

		// console.log("Document HTML after filter:", document.body.innerHTML);
	});

	// it("Allows filtering users by female gender", async () => {
	// 	const { getByText, getByTestId, queryByText } = render(
	// 		<UserProvider>
	// 			<Main />
	// 		</UserProvider>
	// 	);

	// 	// Click on the filter option for male users.
	// 	fireEvent.click(getByTestId("Female users"));

	// 	// Wait for user cards to be rendered
	// 	await waitFor(() => {
	// 		expect(getByText(`${femaleFn} ${femaleLn}`)).toBeInTheDocument();
	// 		expect(queryByText(`${maleFn}`)).not.toBeInTheDocument();
	// 	});

	// 	// console.log("Document HTML after filter:", document.body.innerHTML);
	// });
});
