import axios from "axios";

// GET ALL Countries
export const getCountries = async () => {
	try {
		const response = await axios.get("https://countriesnow.space/api/v0.1/countries");

		return response.data.data;
	} catch (error) {
		throw new Error("Error fetching all Countries");
	}
};
