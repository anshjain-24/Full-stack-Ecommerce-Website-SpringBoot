export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    return !!token;
   };
   