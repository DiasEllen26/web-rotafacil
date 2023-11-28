// AuthContext.js
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface IAuthContextProps{
	isAuthenticated: boolean
	login(): void
	logout(): void
}

const AuthContext = createContext({} as IAuthContextProps);

interface IAuthProvider {
	children: ReactNode
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(()=>{
		console.log(isAuthenticated)
	},[isAuthenticated])

  const login = () => {
    // Implementar a lógica de login aqui
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implementar a lógica de logout aqui
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
