import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export const cookieManager = {
  // Token
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  },
  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },
  removeToken: () => {
    Cookies.remove(TOKEN_KEY, { path: "/" });
  },

  // You can add other cookie-related functions here
  // For example, for user preferences or other data
};
