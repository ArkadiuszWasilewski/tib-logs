import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User
} from "firebase/auth";

interface UserData {
  uid: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  handleUpdateEmail: (email: string) => Promise<void>;
  handleUpdatePassword: (password: string) => Promise<void>;
}

// Define the shape of UserContext for setUserData
interface UserContextType {
  setUserData: (data: UserData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use AuthContext
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  function handleUpdateEmail(email: string): Promise<void> {
    if (auth.currentUser) {
      return updateEmail(auth.currentUser, email);
    } else {
      throw new Error("No user is currently logged in.");
    }
  }

  function handleUpdatePassword(password: string): Promise<void> {
    if (auth.currentUser) {
      return updatePassword(auth.currentUser, password);
    } else {
      throw new Error("No user is currently logged in.");
    }
  }

  // Send information about token to the server
  const sendTokenToServer = async (): Promise<void> => {
    if (auth.currentUser) {
      try {
        const API_URL = import.meta.env.VITE_API_URL as string;
        const idToken = await auth.currentUser.getIdToken(true);

        // Send token to backend for verification and fetching user data
        const response = await fetch(`${API_URL}/api/auth/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to verify token with server");
        }
        const data = await response.json();
        console.log("Token successfully verified with server");
        console.log(data.userData);
      } catch (error) {
        console.error("Error fetching ID token or sending to server:", error);
      }
    } else {
      console.error("No user is currently logged in");
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    resetPassword,
    handleUpdateEmail,
    handleUpdatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
