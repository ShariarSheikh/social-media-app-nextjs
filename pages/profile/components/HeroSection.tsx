import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccount,
  isLoggedIn,
  logOut,
} from "../../../redux/userLoginSlice/userLoginSlice";

interface Data {
  _id: string;
  name: string;
  email: string;
  profileImg: string;
  created: string;
}

const HeroSection: FC<{ data: Data }> = ({ data }) => {
  const { status } = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logOut());
  };

  const deleteAccountHandler = () => {
    const email: string | null = prompt(
      "To Confirm delete your account right your email"
    );
    const userEmail: string = data?.email;

    if (email === userEmail) {
      dispatch(deleteAccount(data?._id));
    } else {
      alert("Please enter your current email");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#161718] px-4 lg:-px-0">
      <div className="text-center w-full min-h[380px] pb-4 relative border-[1px] border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="w-32 h-32 overflow-hidden rounded-full relative m-auto mt-20">
          {data.profileImg && (
            <Image
              src={data.profileImg}
              alt="my profile"
              objectFit="cover"
              layout="fill"
            />
          )}
          {!data.profileImg && (
            <div className="w-full h-full bg-green-500"></div>
          )}
        </div>
        <h1 className="mb-5 mt-2 text-3xl">{data?.name}</h1>
        <p>Developer working on this page! wait for it to finish 😎</p>

        <p className="mt-32">
          <p>If you have any questions feel free to contact</p>
          <Link href="https://shariar.vercel.app/">
            <a>shariar.dev@gmail.com</a>
          </Link>
        </p>

        <div className="w-full px-5 flex justify-between items-center">
          {status === "pending" ? (
            <button className="outline-none w-34 cursor-wait py-2 px-3 rounded-md bg-red-600 text-white">
              Wait
            </button>
          ) : (
            <button
              onClick={deleteAccountHandler}
              className="outline-none w-34 cursor-pointer py-2 px-3 rounded-md bg-red-600 text-white"
            >
              Delete Account
            </button>
          )}

          <button
            onClick={logOutUser}
            className="outline-none w-28 cursor-pointer py-2 px-3 rounded-md bg-blue-600 text-white"
          >
            SignOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
