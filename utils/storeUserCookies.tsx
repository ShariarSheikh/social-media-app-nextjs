import router from "next/router";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const storeUserCookies = (
  token: string,
  uProfile: { name: string; email: string; profileImg: string }
) => {
  cookies.set(process.env.NEXT_PUBLIC_TOKEN_NAME as string, token, {
    path: "/",
  });
  cookies.set(process.env.NEXT_PUBLIC_USER as string, uProfile, {
    path: "/",
  });
  router.reload();
};
