import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoggedIn,
  loginUser,
} from "../../../redux/userLoginSlice/userLoginSlice";

const Login: FC<{ setIsLogin: (isLogin: string) => void }> = ({
  setIsLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status, error } = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  //onsubmit
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = { email, password };

    if (!email || !password) {
      alert(
        `Please enter your ${!email && "email"} ${!password && "password"}`
      );
    } else {
      dispatch(loginUser(user));
    }
  };

  return (
    <div className="w-full px-3">
      <form onSubmit={onSubmit} className="w-full m-auto mt-9 pb-8">
        <div className="flex flex-col mb-4">
          {status === "rejected" && (
            <p className="text-red-400 py-3">{error}</p>
          )}

          <label htmlFor="Email" className="text-gray-500 dark:text-gray-400">
            Email
          </label>
          <input
            className="outline-none bg-blue-50 py-2 pl-2 text-gray-700 mt-2"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            className="outline-none bg-blue-50 py-2 pl-2 text-gray-700 mt-2"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <p className="mt-2 cursor-pointer dark:text-gray-400 text-gray-500 text-right hover:text-blue-400">
            Forgot password?
          </p>
        </div>

        {status === "pending" ? <LoadingButton /> : <LoginButton />}

        <div className="w-full mt-6 text-gray-500 font-medium text-center">
          <p
            className="mb-1 cursor-pointer hover:text-blue-400"
            onClick={() => setIsLogin("signUp")}
          >
            {" Don't"} have an account? <span>SignUp</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

const LoginButton = () => {
  return (
    <button
      className="w-full mt-2 h-10 rounded-sm cursor-pointer
       bg-blue-600 text-white font-medium active:scale-95 duration-200"
      type="submit"
    >
      LogIn
    </button>
  );
};

const LoadingButton = () => {
  return (
    <button
      className="w-full mt-2 h-10 rounded-sm cursor-wait
        bg-blue-600 text-white font-medium active:scale-95 duration-200"
    >
      Loading...
    </button>
  );
};
