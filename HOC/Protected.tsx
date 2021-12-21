import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Protected = (ProtectedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const user = cookies.get(process.env.NEXT_PUBLIC_USER as string);

      if (user) {
        Router.replace("/");
        return null;
      } else {
        return <ProtectedComponent {...props} />;
      }
    }

    return null;
  };
};

export default Protected;
