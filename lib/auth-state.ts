import Cookies from 'js-cookie';

export const handleLoginSuccess = async (data: any) => {
  try {
    // The cookies should already be set by the API response
    // We just need to ensure they're properly set on the client side too
    Cookies.set("isAuthenticated", "true", { expires: 7 });
    Cookies.set("clientToken", "true", { expires: 7 });
    if (data.user) {
      Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
    }

    console.log("Authentication state confirmed in cookies.");
    return true;
  } catch (error) {
    console.error("Failed to confirm auth state in cookies:", error);
    Cookies.remove("clientToken");
    Cookies.remove("user");
    Cookies.remove("isAuthenticated");
    throw error;
  }
};

export const getAuthState = () => {
  try {
    // Check client-readable cookies
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    const clientToken = Cookies.get("clientToken") === "true";
    const userCookie = Cookies.get("user");

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
      hasClientToken: !!clientToken,
      hasUser: !!user,
    });

    return {
      isAuthenticated: isAuthenticated && !!clientToken,
      token: clientToken || null,
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
  Cookies.remove("clientToken");
  Cookies.remove('user');
  Cookies.remove('isAuthenticated');
};