// import { doc, getDoc } from "@firebase/firestore";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProtectedHome from "../../HOC/ProtectedHome";
// import { db } from "../../firebase";
import Header from "../../Layouts/profile_layouts/Header/Header";
import Setting from "../../Layouts/profile_layouts/Setting/Setting";

const Profile: NextPage = () => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const convertUser = JSON.parse(data);

  //   convertUser && setUser(convertUser);
  // }, [data]);

  return (
    <div>
      <Head>
        <title>Profile - </title>
        <meta name="description" content="chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <div className="max-w-[1366px] min-h-screen m-auto">
          <Header />
          <Setting />
        </div>
      </main>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { u } = context.query;
//   const uid: string = u;

//   if (!uid) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   const docRef = doc(db, "users", uid);
//   const docSnap = await getDoc(docRef);

//   const userData = docSnap.data();

//   const data = JSON.stringify(userData);

//   if (!data) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// };
export default ProtectedHome(Profile);
