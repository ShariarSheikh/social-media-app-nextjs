import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoggedIn,
  logOut,
} from "../../../redux/userLoginSlice/userLoginSlice";

const Index = () => {
  const { user } = useSelector(isLoggedIn);

  const dispatch = useDispatch();

  function logOutUser() {
    dispatch(logOut());
  }

  return (
    <div className="w-full border bg-white dark:bg-transparent dark:border-[#302e2e] p-2 mt-5">
      <div className="w-[40px] m-auto h-[40px] rounded-full overflow-hidden flex justify-center items-center">
        {user.profileImg && (
          <Image
            src={user.profileImg}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full overflow-hidden"
            objectFit="cover"
          />
        )}
        {!user.profileImg && user && (
          <div className="w-full h-full bg-green-500 flex justify-center items-center"></div>
        )}
      </div>
      {user && (
        <div className="mt-1 text-gray-600 dark:text-gray-400">
          <h2 className="font-semibold text-center text-xl">{user.name}</h2>
          <div className="mt-3 flex w-full text-sm justify-center space-x-2">
            <p>
              <span className="font-medium">0</span> Following
            </p>
            <p>
              <span className="font-medium">0</span> Followers
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center items-center mt-6">
        <button
          onClick={() => logOutUser()}
          className="bg-[#efefef] text-black dark:text-[#9ca3af] w-full h-9 font-semibold dark:bg-[#3f4041] dark:hover:bg-gray-900 hover:bg-gray-100 active:scale-105 duration-100"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Index;
