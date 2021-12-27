import { FC, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Form: FC = () => {
  const [isLogin, setIsLogin] = useState<string>("login");

  return (
    <div className="max-w-3xl w-full flex flex-col justify-center items-center h-auto m-auto">
      <div className="w-full h-full pt-24 z-20 text-center">
        <p className=" uppercase text-4xl font-bold mt-5">
          Dev <span className="text-blue-500">People</span>
        </p>
        <p className="mt-7 font-semibold dark:text-gray-400">
          This Application is for only {"developers'"} purposes, not for real
          users for right now, but if you want you can log in or register your
          account. Your login and register information only stayed for 30 days.
          Because they will be deleted automatically on our server.
          <small className="text-gray-500">
            {" "}
            The reason {"it's"} not a real-world application.
          </small>
          <br />
        </p>
      </div>

      <div className="w-full max-w-[360px] mt-9 pb-8">
        {isLogin === "login" && <Login setIsLogin={setIsLogin} />}
        {isLogin === "signUp" && <SignUp setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};

export default Form;
