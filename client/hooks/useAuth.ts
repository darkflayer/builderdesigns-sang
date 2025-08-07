import { useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('sang_authenticated');
    const userData = localStorage.getItem('sang_user');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('sang_authenticated');
    localStorage.removeItem('sang_user');
    setIsAuthenticated(false);
    setUser(null);
    // Redirect to home page
    window.location.href = '/';
  };

  return {
    isAuthenticated,
    user,
    logout
  };
}
