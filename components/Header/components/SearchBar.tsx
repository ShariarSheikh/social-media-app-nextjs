import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../../redux/post/allPostSlice/allPostSlice";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const { allPost } = useSelector(getAllPosts);
  const [searchData, setSearchData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (search) {
      const findingPosts = allPost?.filter((x: any) => {
        return x.postHeader
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      });
      setSearchData(findingPosts);
    }
  }, [search, allPost]);
  useEffect(() => {
    setSearch("");
  }, [router.reload]);

  return (
    <div className="relative h-full flex-grow max-w-[666px] flex items-center mx-3">
      <div className="w-full hidden sm:block">
        <div className="h-10 px-3 w-full bg-gray-100 dark:bg-[#404142f7] rounded-lg flex justify-center items-center">
          <AiOutlineSearch className="w-5 h-5 text-gray-600 dark:text-gray-200" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="w-full h-full outline-none text-gray-600 dark:text-gray-200 bg-transparent pl-3"
          />
        </div>
      </div>

      {search && (
        <div className="absolute p-2 top-[49px] shadow-lg z-50 bg-white dark:bg-[#121313] rounded-md w-full min-h-[100px] max-h-[300]">
          {allPost.length > 0 && searchData.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <p>
                No post found at this name
                <span className="text-green-400 font-semibold">
                  {" " + search}
                </span>
              </p>
            </div>
          )}
          {searchData.length > 0 && (
            <div className="flex flex-col w-full px-3">
              {searchData.map((x: any) => (
                <Link key={x._id} href={`/posts/${x._id}`} passHref>
                  <a className="mb-6 cursor-pointer hover:scale-95 duration-150">
                    <h1 className="line-clamp-1 dark:text-gray-300 font-semibold text-xl">
                      {x.postHeader}
                    </h1>
                    <p className="line-clamp-2 dark:text-gray-400">
                      {x.postParagraph}
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
