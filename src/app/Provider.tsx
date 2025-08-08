import { DarkModeProvider } from "@/context/DarkModeContext";
import { UserContextProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";   

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProvidersProps) => {
  return (
    <DarkModeProvider>
      <UserContextProvider>
        <AuthProvider>{children}</AuthProvider>
      </UserContextProvider>
    </DarkModeProvider>
  );
};

export default AppProvider;