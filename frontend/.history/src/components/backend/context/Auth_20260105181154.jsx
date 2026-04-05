import React from 'react';
export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {    // Here <App /> component is passed as children from main.jsx
  const stored = localStorage.getItem('userInfo'); // user info is coming from login.jsx  
  const [user, setUser] = React.useState(() => (stored ? JSON.parse(stored) : null));
 
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData)); // userData is coming from login.jsx
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}    {/* children is coming from main.jsx where <App /> component is passed as a child to AuthProvider */}
    </AuthContext.Provider>
  );
};
 