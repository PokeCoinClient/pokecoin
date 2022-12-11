import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    username: null,
    token: null,
    coins: null,
    _id: null,
  });

  const isAuthenticated = user?.token ?? false;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const coins = localStorage.getItem('coins');
    const _id = localStorage.getItem('id');
    if (token) {
      setUser({ username, token, coins, _id });
    }
  }, []);

  const setLogin = useCallback((token) => {
    localStorage.setItem('token', token);
    setUser((prev) => ({ ...prev, token }));
  }, []);

  const setUserDetails = useCallback((userDetails) => {
    setUser((prev) => ({ ...prev, ...userDetails }));
    localStorage.setItem('username', userDetails.username);
    localStorage.setItem('id', userDetails._id);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('coins');
    localStorage.removeItem('id');
    setUser(null);
  };

  const value = useMemo(() => {
    return { user, setLogin, logout, setUserDetails, isAuthenticated };
  }, [setLogin, setUserDetails, user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
