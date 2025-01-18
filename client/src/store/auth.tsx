import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface AuthContextProps {
  isLoggedIn: boolean;
  storeTokenInLs: (serverToken: string) => void;
  LogoutUser: () => void;
  user: Record<string, any> | null;
  userAuthToken: string;
  isLoading: boolean;
  token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string >(localStorage.getItem("token")||"");
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userAuthToken = `Bearer ${token}`;

  // Store token in localStorage
  const storeTokenInLs = (serverToken: string) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    // user authentication
    const userAuthentication = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/user`, {
          headers: {
            Authorization: userAuthToken,
          },
        });
        setUser(response.data.userData);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    userAuthentication();
  }, [token]);

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <div className="w-[100px] h-[100px] border-8 border-t-8 border-r-blue-600 border-t-green-600 border-l-rose-600 border-solid rounded-full animate-spin"></div>
        <p className="text-md m-2 text-white">Establishing connection, please wait...</p>
      </section>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLs,
        LogoutUser,
        user,
        userAuthToken,
        isLoading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
