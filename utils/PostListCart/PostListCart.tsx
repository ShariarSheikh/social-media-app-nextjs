import Image from "next/image";

const PostListCart = () => {
  return (
    <div className="w-full border-b dark:border-[#302e2e] pb-2 mb-10 hover:bg-gray-100 dark:hover:bg-[#161616]">
      <div className="w-60 h-40 relative overflow-hidden rounded-xl cursor-pointer">
        <Image
          src="https://images.unsplash.com/photo-1597733336794-12d05021d510?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          objectFit="cover"
          layout="fill"
          alt="article post"
        />
      </div>
      <div className="mt-3 pl-2">
        <h1 className="text-3xl text-gray-600 dark:text-gray-400 font-medium cursor-pointer">
          How to learn web development in 2022
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-500 mt-2">
          As in these competitive times to make your business stay strong in the
          market you must get an online software or solution which can be used
          by the customers. Hence in all, I must say web development is a sector
          which will grow instead of going out of style. And hence it is a great
          career field in 2022–23 and beyond.
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
  );
};

export default PostListCart;
