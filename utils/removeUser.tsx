import router from "next/router";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const removeUser = () => {
  cookies.remove(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
  cookies.remove(process.env.NEXT_PUBLIC_USER as string);
  router.reload();
};

export default removeUser;
