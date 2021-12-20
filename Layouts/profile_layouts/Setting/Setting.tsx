import React, { FC } from "react";
import Link from "next/link";
import router from "next/router";
import { signOut } from "next-auth/react";

const Setting: FC = () => {
  function logOutUser() {
    signOut();
    router.replace("/join");
  }
  return (
    <div className="w-full bg-white dark:bg-[#161718] mt-28 px-4 lg:-px-0">
      <div className="text-center w-full min-h[380px] h-[600px] relative border-[1px] border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <h1 className="mb-5 mt-20 text-3xl">Hello World</h1>
        <p>Developer working on this page! wait for it to finish 😎</p>

        <p className="mt-32">
          <p>If you have any questions feel free to contact</p>
          <Link href="https://shariar.vercel.app/">
            <a>shariar.dev@gmail.com</a>
          </Link>
        </p>

        <h2
          onClick={logOutUser}
          className="mt-4 cursor-pointer py-2 px-3 rounded-md bg-blue-600 text-white"
        >
          SignOut
        </h2>
      </div>
    </div>
  );
};

export default Setting;
