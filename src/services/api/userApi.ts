import axiosInstance from "../axiosInstance";

// GET ALL Users
export const getUsers = async () => {
	try {
		const response = await axiosInstance.get("/?results=9");
		return response.data.results;
	} catch (error) {
		throw new Error("Error fetching all Users");
	}
};
