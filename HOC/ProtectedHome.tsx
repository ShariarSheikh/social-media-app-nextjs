import { useRouter } from "next/router";

const ProtectedHome = (ProtectedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const userIsLoggedIn = false;

      if (!userIsLoggedIn) {
        Router.replace("/join");
        return null;
      } else {
        return <ProtectedComponent {...props} />;
      }
    }

    return null;
  };
};

export default ProtectedHome;
