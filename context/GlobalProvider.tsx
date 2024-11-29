import { getCurrentUser } from "@/lib/appwite";
import { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

type GlobalContextProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: Models.Document | null;
    setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
    isLoading: boolean;
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Custom hook to use the GlobalContext
export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalProvider"
        );
    }
    return context;
};

export const GlobalProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<Models.Document | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await getCurrentUser();

                if (currentUser) {
                    setIsLoggedIn(true);
                    setUser(currentUser);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
