 const AuthService = {
    setTokens: (accessToken, idToken) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('isAuthenticated', 'true');
    },
  
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
    },
  
    isAuthenticated: () => {
      return localStorage.getItem('isAuthenticated') === 'true';
    },
  
    getAccessToken: () => {
      return localStorage.getItem('accessToken');
    }
  };
  
    export default AuthService;