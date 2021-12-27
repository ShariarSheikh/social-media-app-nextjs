import { FC } from "react";
import Image from "next/image";

interface Users {
  email: string;
  name: string;
  img: string;
}

const UserListCart: FC<Users> = ({ img, name, email }) => {
  return (
    <div className="w-full h-14 items-center px-3 mb-4 flex cursor-pointer justify-start active:scale-95 duration-300 rounded-md dark:bg-[#17191e] bg-gray-100">
      <div className="h-10 w-10 rounded-full overflow-hidden relative">
        {img && <Image src={img} alt={name} layout="fill" objectFit="cover" />}
        {!img && (
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex justify-center items-center">
            <p>{name[0]}</p>
          </div>
        )}
      </div>
      <div className="h-full flex justify-center flex-col ml-3">
        <p className="dark:text-gray-300 text-lg">{name}</p>
        <p className="dark:text-gray-300 text-sm">{email}</p>
      </div>
    </div>
  );
};

export default UserListCart;
