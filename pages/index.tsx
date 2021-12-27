import type { NextPage } from "next";
import Head from "next/head";
import FeedContainer from "../Layouts/home_layouts/FeedContainer/Index";
import AddTagComponent from "../Layouts/home_layouts/AddTagComponent/AddTagComponent";
import ProfileInfo from "../Layouts/home_layouts/Profile_Info/Index";
import AllTags from "../Layouts/home_layouts/AllTags/AllTags";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/userLoginSlice/userLoginSlice";
import SelectedTags from "../Layouts/home_layouts/AddTagComponent/SelectedTags";


const Home: NextPage = () => {
  const { user } = useSelector(isLoggedIn);

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#121212]">
      <Head>
        <title>People😎 Dev</title>
        <meta name="description" content="chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen mt-16 relative">
        <AllTags />
        <SelectedTags />
        <section className="w-full px-3 2xl:px-0 max-w-[1366px] flex flex-row min-h-screen relative m-auto overflow-hidden">
          <div className="hidden xl:block min-w-[300px] w-full max-w-[300px] relative">
            <AddTagComponent />
          </div>
          <div className="w-full flex-grow max-w-[700px] sm:px-7">
            <FeedContainer />
          </div>

          <div className="md:min-w-[200px] lg:min-w-[300px] max-w-[300px]">
            <div className="min-w-[200px] hidden md:block w-full max-w-[300px] relative">
              {user?.name && <ProfileInfo />}
            </div>
            <div className="hidden md:block xl:hidden lg:min-w-[300px] min-w-[200px] w-full lg:max-w-[300px] max-w-[220px] relative">
              <AddTagComponent />
            </div>
          </div>
        </section>
        {/* // )} */}
      </main>
    </div>
  );
};

export default Home;
