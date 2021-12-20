import { useDispatch } from "react-redux";
import { searchByName } from "../../../redux/searchArticle/searchArticle";

const SearchByName = () => {
  const dispatch = useDispatch();

  return (
    <div className="dark:bg-[#3f4041] bg-gray-50 w-full h-10 rounded-lg">
      <input
        className="w-full h-full bg-transparent outline-none px-3 dark:text-gray-300 text-gray-600"
        type="text"
        onChange={(e) => dispatch(searchByName(e.target.value))}
        placeholder="Search by name"
      />
    </div>
  );
};

export default SearchByName;
