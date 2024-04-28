import { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "../helpers/types";

interface UserContextType {
	currentUser: IUser | null;
	setCurrentUser: (currentUser: IUser) => void;
	showDetails: boolean;
	setShowDetails: (showDetails: boolean) => void;
	showCountry: boolean;
	setShowCountry: (showCountry: boolean) => void;
	searchQuery: string;
	setSearchQuery: (searchQuery: string) => void;
	selectedFilter: string;
	setSelectedFilter: (selectedFilter: string) => void;
	currentPage: number;
	setCurrentPage: (currentPage: number) => void;
	selectedCountry: { country: string } | null;
	setSelectedCountry: (selectedCountry: { country: string } | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);
	const [showDetails, setShowDetails] = useState(false);
	const [showCountry, setShowCountry] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedFilter, setSelectedFilter] = useState<string>("all");
	const [selectedCountry, setSelectedCountry] = useState<{ country: string } | null>(null);

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				showDetails,
				setShowDetails,
				showCountry,
				setShowCountry,
				searchQuery,
				setSearchQuery,
				selectedFilter,
				setSelectedFilter,
				currentPage,
				setCurrentPage,
				selectedCountry,
				setSelectedCountry,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
