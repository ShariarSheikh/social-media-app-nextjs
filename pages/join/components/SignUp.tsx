import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoggedIn,
  singUpUser,
} from "../../../redux/userLoginSlice/userLoginSlice";

const SignUp: FC<{ setIsLogin: (isLogin: string) => void }> = ({
  setIsLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { status, error } = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  //onsubmit
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = { name, email, password };
    if (!email || !password || !name) {
      alert(
        `Please enter your ${!email && "email"} ${!password && "password"} ${
          !name && "name"
        }`
      );
    } else {
      dispatch(singUpUser(user));
    }
  };

  return (
    <div className="w-full px-3">
      {status === "rejected" && <p className="text-red-400 py-3">{error}</p>}

      <form
        onSubmit={onSubmit}
        className="w-full max-w-[360px] m-auto mt-9 pb-8"
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="Name" className="text-gray-500 dark:text-gray-400">
            Name
          </label>
          <input
            className="outline-none dark:bg-[#2d3240] bg-gray-100 py-2 pl-2 text-gray-700 dark:text-gray-300 mt-2"
            type="name"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="Email" className="text-gray-500 dark:text-gray-400">
            Email
          </label>
          <input
            className="outline-none dark:bg-[#2d3240] bg-gray-100 py-2 pl-2 text-gray-700 dark:text-gray-300 mt-2"
            type="email"
            placeholder="Enter your email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="Password"
            className="text-gray-500 dark:text-gray-400"
          >
            Password
          </label>
          <input
            className="outline-none dark:bg-[#2d3240] bg-gray-100 py-2 pl-2 text-gray-700 dark:text-gray-300 mt-2"
            type="password"
            placeholder="Enter your password"
            value={password}
            minLength={6}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {status === "pending" ? <LoadingButton /> : <LoginButton />}

        <div className="w-full mt-6 text-gray-500 font-medium text-center">
          <p
            className="mb-1  cursor-pointer hover:text-blue-400"
            onClick={() => setIsLogin("login")}
          >
            Already have an account? <span>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

const LoginButton = () => {
  return (
    <button
      className="w-full mt-5 h-10 rounded-sm cursor-pointer
       bg-blue-600 text-white font-medium active:scale-95 duration-200"
      type="submit"
    >
      SignUp
    </button>
  );
};

const LoadingButton = () => {
  return (
    <button
      className="w-full mt-5 h-10 rounded-sm cursor-wait
        bg-blue-600 text-white font-medium active:scale-95 duration-200"
    >
      Loading...
    </button>
  );
};
