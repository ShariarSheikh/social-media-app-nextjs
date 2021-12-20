import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Index";
import FeedContainer from "../Layouts/home_layouts/FeedContainer/Index";
import AddTagComponent from "../Layouts/home_layouts/AddTagComponent/AddTagComponent";
import ProfileInfo from "../Layouts/home_layouts/Profile_Info/Index";
import AllTags from "../Layouts/home_layouts/AllTags/AllTags";


const Home: NextPage = ({ uData }) => {


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
          {false && (
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

export const getServerSideProps: GetServerSideProps = async () => {
  const data = ["nahid", "shariar"];

  if (!data) {
    return {
      redirect: {
        destination: "/join",
        permanent: false,
      },
    };
  }

  return {
    props: {
      uData: data,
    },
  };
};

export default Home;
