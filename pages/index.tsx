import type { GetServerSideProps, NextPage } from "next";
import Cookies from "universal-cookie";
import Head from "next/head";
import Header from "../components/Header/Index";
import FeedContainer from "../Layouts/home_layouts/FeedContainer/Index";
import AddTagComponent from "../Layouts/home_layouts/AddTagComponent/AddTagComponent";
import ProfileInfo from "../Layouts/home_layouts/Profile_Info/Index";
import AllTags from "../Layouts/home_layouts/AllTags/AllTags";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, isLoggedIn } from "../redux/userLoginSlice/userLoginSlice";

const cookies = new Cookies();

const Home: NextPage = ({ data }) => {
  const { user } = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.isLoggedInUser && data.isToken) {
      cookies.remove(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
      cookies.remove(process.env.NEXT_PUBLIC_PROFILE_IMG_NAME as string);
      cookies.remove(process.env.NEXT_PUBLIC_USER_NAME as string);
    }
    if (data.data && data.isLoggedInUser && data.isToken) {
      dispatch(addUser(data.data));
    }
  }, [data, dispatch]);

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#121212]">
      <Head>
        <title>People😎 Dev</title>
        <meta name="description" content="chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="w-full min-h-screen mt-16 relative">
        <AllTags />
        <section className="w-full max-w-[1366px] flex flex-row min-h-screen relative m-auto overflow-hidden">
          <div className="min-w-[300px] w-full max-w-[300px] relative">
            <AddTagComponent />
          </div>
          <div className="w-full flex-grow max-w-[700px] px-7">
            <FeedContainer />
          </div>
          {user?.name && (
            <div className="min-w-[300px] w-full max-w-[300px] relative">
              <ProfileInfo />
            </div>
          )}
        </section>
        {/* // )} */}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME as string;
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get(tokenName);

  try {
    const fetchUser = await axios.get("http://localhost:8000/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { user } = await fetchUser?.data?.data;

    return {
      props: {
        data: {
          isLoggedInUser: true,
          isToken: true,
          data: user,
        },
      },
    };
  } catch (error) {}

  return {
    props: {
      data: {
        isLoggedInUser: false,
        isToken: token ? true : false,
        data: false,
      },
    },
  };
};

export default Home;
