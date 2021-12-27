import Cookies from "universal-cookie";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Post from "./components/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/post/updatePostSlice/updatePostSlice";
import EditPost from "./components/EditPost/EditPost";
const cookies = new Cookies();

interface DataProfilePage {
  isLoggedInUser: boolean;
  isToken: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    profileImg: string;
    created: string;
  };
}

const Profile: NextPage<{ data: DataProfilePage }> = ({ data }) => {
  const { isUpdate } = useSelector(updatePost);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.isLoggedInUser && data.isToken) {
      cookies.remove(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
      cookies.remove(process.env.NEXT_PUBLIC_USER as string);
    }
  }, [data, dispatch]);
  return (
    <div>
      <Head>
        <title>{data.data.name}</title>
        <meta name="description" content="chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        {isUpdate && <EditPost />}
        <div className="max-w-[1366px] min-h-screen m-auto pb-5">
          {data?.data && (
            <>
              <HeroSection data={data?.data} />
              <Post data={data?.data} />
              <Footer data={data?.data} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME as string;
  const cookies = new Cookies(req.headers.cookie);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
  const token = cookies.get(tokenName);

  try {
    const fetchUser = await axios.get(
      process.env.NEXT_PUBLIC_PROFILE_URL as string,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          API_KEY: apiKey,
        },
      }
    );
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
  } catch (error) {
    cookies.remove(process.env.NEXT_PUBLIC_TOKEN_NAME as string);
    cookies.remove(process.env.NEXT_PUBLIC_USER as string);
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
};
export default Profile;
