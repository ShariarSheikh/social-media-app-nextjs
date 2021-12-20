import { AiOutlineNotification, AiOutlineSearch } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { ThemeButtons } from "../../utils/ThemeButtons";
import HeaderIcon from "./components/HeaderIcon";
import ProfileAvatar from "./components/ProfileAvatar";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/userLoginSlice/userLoginSlice";

const Index = () => {
  const { user } = useSelector(isLoggedIn);

  return (
    <header className="w-full h-14 fixed top-0 border-b-[1px] border-gray-200 dark:border-gray-700 z-40 bg-glass-blur">
      <div className="max-w-[1366px] m-auto h-full flex justify-between items-center">
        <div>
          <h1 className="font-semibold cursor-pointer text-xl uppercase">
            <Link href="/" passHref>
              <a>
                Dev <span className="text-blue-500">People</span>
              </a>
            </Link>
          </h1>
        </div>

        {/* input div */}
        <div className="h-full flex-grow max-w-[666px] flex items-center">
          <div className="h-10 w-full bg-gray-100 dark:bg-[#404142f7] rounded-lg flex items-center ">
            <AiOutlineSearch className="w-5 h-5 text-gray-600 dark:text-gray-200 ml-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full outline-none text-gray-600 dark:text-gray-200 bg-transparent pl-3"
            />
          </div>
        </div>

        {/* link div */}
        <div className="flex items-center h-full space-x-6">
          <div className="h-full flex justify-center items-center">
            <Link href="/articles" passHref>
              <a className="font-medium dark:text-gray-400 text-gray-600 cursor">
                Articles
              </a>
            </Link>
            <Link href="/questions" passHref>
              <a className="font-medium dark:text-gray-400 text-gray-600 cursor ml-3">
                Questions
              </a>
            </Link>
          </div>

          <ThemeButtons />

          {user?.email ? (
            <>
              <HeaderIcon
                Icon={
                  <IoIosAddCircleOutline className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                }
                link="/"
                isDispatch="createPost"
              />
              <HeaderIcon
                Icon={
                  <AiOutlineNotification className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                }
                link="/notification"
                badge={3}
              />

              <div className="cursor-pointer">
                <ProfileAvatar avatar={user?.profileImg} link="/profile" />
              </div>
            </>
          ) : (
            <div className="flex items-center h-full justify-center py-2 px-3 rounded-2xl overflow-hidden">
              <Link href="/join" passHref>
                <a>
                  <BsPerson className="w-6 h-6 active:scale-125 duration-200" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Index;
