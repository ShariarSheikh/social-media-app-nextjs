import { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchByName: FC<{
  search: string;
  setSearch: (search: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <div className="dark:bg-[#3f4041] bg-gray-50 w-full h-10 rounded-lg flex justify-center items-center">
      <AiOutlineSearch className="w-6 h-6 ml-3 dark:text-gray-400 text-gray-500" />
      <input
        className="w-full h-full bg-transparent outline-none px-3 dark:text-gray-300 text-gray-600"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Post"
      />
    </div>
  );
};

export default SearchByName;
