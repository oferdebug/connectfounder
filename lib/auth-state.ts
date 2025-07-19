import Cookies from 'js-cookie';

export const handleLoginSuccess = async (data: any) => {
  try {
    if (!data.token) {
      throw new Error("No token received");
    }

    Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
    Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
    Cookies.set('isAuthenticated', 'true', { expires: 7 });

    console.log("Authentication state stored successfully in cookies.");
    return true;
  } catch (error) {
    console.error("Failed to store auth state in cookies:", error);
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('isAuthenticated');
    throw error;
  }
};

export const getAuthState = () => {
  try {
    // Add a small delay to ensure cookies are available
    const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
    const token = Cookies.get('token');
    const userCookie = Cookies.get('user');
    
    let user = null;
    if (userCookie) {
      try {
        user = JSON.parse(userCookie);
      } catch (e) {
        console.error("Failed to parse user cookie:", e);
      }
    }

    console.log("Auth state retrieved:", { 
      isAuthenticated, 
      hasToken: !!token, 
      hasUser: !!user 
    });

    return {
      isAuthenticated: isAuthenticated && !!token,
      token: token || null,
      user: user || null,
    };
  } catch (error) {
    console.error("Error retrieving auth state:", error);
    return {
      isAuthenticated: false,
      token: null,
      user: null,
    };
  }
};

export const clearAuthState = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  Cookies.remove('isAuthenticated');
};