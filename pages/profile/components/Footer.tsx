import Link from "next/link";
import router from "next/router";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccount,
  isLoggedIn,
  logOut,
} from "../../../redux/userLoginSlice/userLoginSlice";

interface DataComponent {
  _id: string;
  name: string;
  email: string;
  profileImg: string;
  created: string;
}

const Footer: FC<{ data: DataComponent }> = ({ data }) => {
  const { status } = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logOut());
    router.replace("/");
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
    <div>
      <p className="mt-32 text-center">
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
  );
};

export default Footer;
