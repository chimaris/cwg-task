import { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "../types";

interface UserContextType {
	currentUser: IUser | null;
	setCurrentUser: (currentUser: IUser) => void;
	showDetails: boolean;
	setShowDetails: (showDetails: boolean) => void;
	isChecked: boolean;
	setIsChecked: (isChecked: boolean) => void;
	searchQuery: string;
	setSearchQuery: (searchQuery: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);
	const [showDetails, setShowDetails] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>("");

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser, showDetails, setShowDetails, isChecked, setIsChecked, searchQuery, setSearchQuery }}>
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
