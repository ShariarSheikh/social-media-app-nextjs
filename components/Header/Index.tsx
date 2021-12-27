import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ThemeButtons } from "../../utils/ThemeButtons";
import HeaderIcon from "./components/HeaderIcon";
import ProfileAvatar from "./components/ProfileAvatar";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/userLoginSlice/userLoginSlice";
import { createPost } from "../../redux/post/createPostSlice/createPostSlice";
import SearchBar from "./components/SearchBar";
const CreatePost = dynamic(() => import("../CreatePost/CreatePost"));

const Index = () => {
  const { isCreatePost } = useSelector(createPost);
  const { user } = useSelector(isLoggedIn);

  return (
    <header className="w-full h-14 px-2 fixed top-0 border-b-[1px] border-gray-200 dark:border-gray-700 z-40 bg-glass-blur">
      {isCreatePost && <CreatePost />}
      <div className="max-w-[1366px] m-auto h-full flex justify-between items-center">
        <div>
          <h1 className="font-semibold cursor-pointer sm:text-xl uppercase text-sm">
            <Link href="/" passHref>
              <a>
                Dev <span className="text-blue-500">People</span>
              </a>
            </Link>
          </h1>
        </div>

        {/* input div */}
        <SearchBar />

        {/* link div */}
        <div className="flex items-center h-full md:space-x-6 space-x-2">
          <div className="h-full flex justify-center md:space-x-6 space-x-2 mr-1 items-center">
            <Link href="/posts" passHref>
              <a className="font-medium text-sm md:text-base dark:text-gray-400 text-gray-600 cursor">
                Posts
              </a>
            </Link>
            <Link href="/peoples" passHref>
              <a className="font-medium text-sm md:text-base dark:text-gray-400 text-gray-600 cursor">
                Peoples
              </a>
            </Link>
          </div>

          <ThemeButtons />

          {user?.email ? (
            <>
              <HeaderIcon
                Icon={
                  <IoIosAddCircleOutline className="w-5 h-5 text-gray-600 dark:text-gray-200 cursor-pointer" />
                }
                link=""
                isDispatch="createPost"
              />
              {/* <HeaderIcon
                Icon={
                  <AiOutlineNotification className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                }
                link="/notification"
                badge={3}
              /> */}

              <div className="cursor-pointer">
                <ProfileAvatar
                  name={user?.name}
                  avatar={user?.profileImg}
                  link="/profile"
                />
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
