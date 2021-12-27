import Image from "next/image";
import router from "next/router";
import { FC } from "react";

interface PostListCart {
  img?: string;
  title: string;
  paragraph: string;
  link: string;
  created: string;
}

const PostListCart: FC<PostListCart> = ({
  img,
  title,
  paragraph,
  link,
  created,
}) => {
  return (
    <div className="w-full flex-col md:flex-row flex justify-center items-center border-b dark:border-[#302e2e] pb-2 mb-10 hover:bg-gray-100 dark:hover:bg-[#161616]">
      {img && (
        <div
          onClick={() => router.push(link)}
          className="md:w-60 w-full h-40 relative overflow-hidden rounded-xl cursor-pointer md:mr-6"
        >
          <Image src={img} objectFit="cover" layout="fill" alt="article post" />
        </div>
      )}
      <div className="w-full">
        <div className="mt-3 pl-2">
          <h1
            onClick={() => router.push(link)}
            className="md:text-3xl text-2xl text-gray-600 dark:text-gray-400 font-medium cursor-pointer"
          >
            {title}
          </h1>
          <p className="md:text-lg text-gray-600 dark:text-gray-500 mt-2 line-clamp-3">
            {paragraph}
          </p>
        </div>
        <div className="flex w-full justify-start space-x-3 mt-4 pl-2">
          <h1 className="font-medium text-gray-600 dark:text-gray-400">
            Jub 2022
          </h1>
          <h1 className="font-medium text-gray-600 dark:text-gray-400">
            6 min reed
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PostListCart;
