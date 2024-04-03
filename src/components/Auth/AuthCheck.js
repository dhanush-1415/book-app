import  { useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthCheck = () => {
  useEffect(() => {
    const storedData = localStorage.getItem('bookUserToken');

    if (!storedData || storedData.length === 0) {
      // Redirect to /home
      window.location.href = '/';
      // Display error message using toast
      toast.error("Please login to access this page.");
    }
  }, []);

  return null;
};

export default AuthCheck;
