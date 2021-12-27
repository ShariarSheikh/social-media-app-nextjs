import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addTags,
  selectedTags,
} from "../../../redux/addTagsSlice/addTagsSlice";
interface Tags {
  id: number;
  tag: string;
  bg: string;
  color: string;
}

const SelectedTags: FC = () => {
  const [hide, setHide] = useState<boolean>(false);
  const { tags } = useSelector(selectedTags);
  const dispatch = useDispatch();

  const removeTags = (id: number) => {
    const newTags = tags.filter((tag: Tags) => tag.id !== id);
    dispatch(addTags(newTags));
  };
  return (
    <div className="block md:hidden w-full px-2">
      <p
        onClick={() => setHide((prevState) => !prevState)}
        className="text-sm underline text-gray-600 dark:text-gray-400"
      >
        {hide ? "Hide" : "See"} my selected tags
      </p>
      <div
        className={`${
          hide ? "h-auto" : "h-0 overflow-hidden duration-150"
        } w-full dark:bg-black bg-opacity-50 mt-2`}
      >
        {tags.length === 0 ? (
          <p className="text-gray-500 text-xl">0</p>
        ) : (
          <div className="w-full flex justify-evenly items-center flex-wrap py-2">
            {tags?.map(({ id, tag }: { id: number; tag: string }) => (
              <button
                key={id}
                className={`py-1 px-2 border-b border-gray-300 dark:border-[#302e2e] text-gray-600 dark:text-gray-500 font-medium flex justify-center items-center rounded-3xl mb-2 relative`}
              >
                <p>{tag}</p>
                <AiOutlineClose
                  onClick={() => removeTags(id)}
                  className="text-white w-6 h-6 p-1 ml-2 bg-black rounded-full overflow-hidden"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedTags;
