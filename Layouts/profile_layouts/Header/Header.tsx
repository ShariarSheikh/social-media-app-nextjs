import Image from "next/image";
import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const Header: FC = () => {
  const name: string = "Shariar";

  const photoURL: string =
    "https://images.unsplash.com/photo-1599572739984-8ae9388f23b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  return (
    <div className="w-full bg-[#161718]">
      <div className="w-full min-h[380px] h-[380px] relative">
        {/* cover profile */}
        <div className="w-full h-full relative">
          <Image
            src="https://images.unsplash.com/photo-1599572739984-8ae9388f23b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            layout="fill"
            alt="cover photo"
            objectFit="cover"
          />
        </div>

        {/* profile picture */}
        <div className="w-full flex flex-col items-center justify-center absolute -bottom-14">
          {/* picture */}
          <div className="w-32 h-32 overflow-hidden rounded-full relative">
            {photoURL && (
              <Image
                src={photoURL}
                alt="my profile"
                objectFit="cover"
                layout="fill"
              />
            )}
            {!photoURL && (
              <Image
                src="https://images.unsplash.com/photo-1612258643486-7dcde687c46d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>

          {/* name */}
          <div>
            <p className="text-xl font-medium text-gray-700 dark:text-gray-200 mt-4">
              {name}
            </p>
          </div>
        </div>

        {/* edit profile */}
        <div
          className="w-10 h-10 bg-white dark:bg-gray-600 overflow-hidden absolute bottom-0 right-0 z-30
        rounded-full cursor-pointer active:scale-110 duration-150 flex justify-center items-center"
        >
          <AiOutlineEdit className="dark:text-gray-300 text-gray-700 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
