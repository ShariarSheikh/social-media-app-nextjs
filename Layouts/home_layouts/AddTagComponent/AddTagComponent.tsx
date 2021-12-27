import { FC } from "react";
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
const Index: FC = () => {
  const { tags } = useSelector(selectedTags);
  const dispatch = useDispatch();

  const removeTags = (id: number) => {
    const newTags = tags.filter((tag: Tags) => tag.id !== id);
    dispatch(addTags(newTags));
  };

  return (
    <div className="w-full border dark:border-[#302e2e] mt-5 p-2">
      <p className="text-base text-gray-600 dark:text-gray-500 font-medium">
        To better find Result select tags for only these tags related articles
        show to you
      </p>
      <div className="w-full min-h-[100px] mt-3">
        <h3 className="text-gray-600 dark:text-gray-300 uppercase text-sm">
          Your Selected Tags
        </h3>
        {tags.length === 0 ? (
          <p className="text-gray-500 text-xl">0</p>
        ) : (
          <div className="w-full flex justify-start items-center flex-wrap py-2">
            {tags?.map(({ id, tag }: { id: number; tag: string }) => (
              <button
                key={id}
                className={`py-1 px-2 border-b border-gray-300 dark:border-[#302e2e] text-gray-600 dark:text-gray-500 font-medium flex justify-center items-center rounded-3xl mb-2 relative`}
              >
                <p>{tag}</p>
                <AiOutlineClose
                  onClick={() => removeTags(id)}
                  className="text-white w-6 h-6 p-1 ml-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
