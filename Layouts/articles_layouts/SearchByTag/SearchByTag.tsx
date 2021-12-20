import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  searchByTag,
  searchHandler,
} from "../../../redux/searchArticle/searchArticle";

const SearchByTag = () => {
  const dispatch = useDispatch();
  return (
    <div className="dark:bg-[#3f4041] bg-gray-50 w-full h-10 rounded-lg flex justify-center items-center">
      <input
        className="w-full h-full bg-transparent outline-none px-3 dark:text-gray-300 text-gray-600"
        type="text"
        onChange={(e) => dispatch(searchByTag(e.target.value))}
        placeholder="Search by tag"
      />
      <AiOutlineSearch
        onClick={() => dispatch(searchHandler(true))}
        className="w-6 h-6 cursor-pointer mr-3 dark:text-gray-400 text-gray-500 active:scale-125 duration-200"
      />
    </div>
  );
};

export default SearchByTag;
