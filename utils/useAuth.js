import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const initialState = { session: null, user: null };
const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setAuth({ user: session.user, session });
    }
    return supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session);
      if (session) {
        setAuth({ user: session.user, session });
      } else {
        setAuth(initialState);
      }
    });
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
