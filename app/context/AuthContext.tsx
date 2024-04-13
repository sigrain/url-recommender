import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../lib/firebase";

type AuthContextType = User | null | undefined;

const AuthContext = createContext<{ user: AuthContextType, loading: boolean }>({
  user: null,
  loading: true
});

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthContextType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
        console.log(user)
        unsubscribe()
    };
  }, []);
console.log('ppp')
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
    console.log(useContext(AuthContext));
  return useContext(AuthContext);
};

interface Props {
  children: ReactNode;
}

export default AuthContextProvider;
