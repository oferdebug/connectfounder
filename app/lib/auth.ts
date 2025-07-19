import Cookies from "js-cookie";

// Types
interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
}

export const handleLoginSuccess = async (data: any) => {
  try {
    if (!data.token) {
      throw new Error("No token received");
    }

    // Store in cookies (for middleware to read)
    Cookies.set("token", data.token, { expires: 7 }); // 7 days
    Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
    Cookies.set("isAuthenticated", "true", { expires: 7 });

    console.log("✅ Authentication state stored successfully in cookies");
    return true;
  } catch (error) {
    console.error("❌ Failed to store auth state:", error);
    clearAuthState();
    throw error;
  }
};

export const getAuthState = (): AuthState => {
  try {
    // Check if we're in browser environment
    if (typeof window === "undefined") {
      return {
        isAuthenticated: false,
        token: null,
        user: null,
      };
    }

    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user");

    let user = null;
    if (userCookie) {
      try {
        user = JSON.parse(userCookie);
      } catch (e) {
        console.error("Failed to parse user cookie:", e);
      }
    }

    const authState = {
      isAuthenticated: isAuthenticated && !!token,
      token: token || null,
      user: user || null,
    };

    console.log("Auth state retrieved:", {
      isAuthenticated: authState.isAuthenticated,
      hasToken: !!authState.token,
      hasUser: !!authState.user,
    });

    return authState;
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
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("isAuthenticated");
  console.log("🧹 Auth state cleared");
};

// For backward compatibility
export const getClientAuthState = getAuthState;

// Example implementation for createToken (replace with your actual logic)
export const createToken = (arg0: { id: string; email: any }) => {
  // Replace with actual token creation logic
  return `${arg0.id}:${arg0.email}`;
};
