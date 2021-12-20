import { useRouter } from "next/router";

const Protected = (ProtectedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const userIsLoggedIn = false;

      if (userIsLoggedIn) {
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
