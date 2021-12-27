import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTags,
  selectedTags,
} from "../../../redux/addTagsSlice/addTagsSlice";

const ArticleTags = [
  {
    id: 1,
    bg: "bg-[#F0DB4F]",
    color: "text-black",
    tag: "JavaScript",
  },
  {
    id: 2,
    bg: "bg-[#3C873A]",
    color: "text-gray-200",
    tag: "Node Js",
  },
  {
    id: 3,
    bg: "bg-[#FFD43B]",
    color: "text-black",
    tag: "Python",
  },
  {
    id: 4,
    bg: "bg-[#B0B3D6]",
    color: "text-black",
    tag: "PHP",
  },
  {
    id: 5,
    bg: "bg-[#61DBFB]",
    color: "text-black",
    tag: "React Js",
  },
  {
    id: 6,
    bg: "bg-[#000000]",
    color: "text-gray-200",
    tag: "Next Js",
  },
  {
    id: 7,
    bg: "bg-[#007acc]",
    color: "text-gray-200",
    tag: "Typescript",
  },
  {
    id: 8,
    bg: "bg-[#29beb0]",
    color: "text-gray-200",
    tag: "GO",
  },
  {
    id: 9,
    bg: "bg-[#092e20]",
    color: "text-gray-200",
    tag: "Django",
  },
  {
    id: 10,
    bg: "bg-[#B52E31]",
    color: "text-gray-200",
    tag: "Angular Js",
  },
  {
    id: 11,
    bg: "bg-[#41B883]",
    color: "text-gray-200",
    tag: "Vue Js",
  },
  {
    id: 12,
    bg: "bg-[#F05340]",
    color: "text-gray-900",
    tag: "Laravel",
  },
  {
    id: 13,
    bg: "bg-[#303030]",
    color: "text-gray-200",
    tag: "Express Js",
  },
];

interface Tags {
  id: number;
  tag: string;
  bg: string;
  color: string;
}

const AllTags = () => {
  const { tags } = useSelector(selectedTags);
  const [moreTag, setMoreTag] = useState(false);

  const dispatch = useDispatch();

  const selectTagHandler = ({ id, tag, bg, color }: Tags) => {
    const newTag: Tags = {
      id,
      tag,
      bg,
      color,
    };

    if (tags.length > 0) {
      const isExist = tags.find((tag: Tags) => tag.id === newTag.id);
      !isExist && dispatch(addTags([newTag, ...tags]));
    } else if (tags.length === 0) {
      dispatch(addTags([newTag, ...tags]));
    }
  };

 return (
    <div className="max-w-[1366px] hide_scroll_bar w-full m-auto overflow-x-scroll relative">
      <div
        className="w-full flex justify-start items-center py-2 space-x-2"
      >
        {ArticleTags?.slice(0, moreTag ? 13 : 12).map(
          ({ id, tag, bg, color }) => (
            <button
              key={id}
              onClick={() => selectTagHandler({ id, tag, bg, color })}
              className={`py-1 min-w-[80px] md:min-w-[90px] md:w-[90px] text-sm md:text-base w-[80px] ${bg} ${color} rounded-3xl mb-2 active:scale-105 duration-150`}
            >
              {tag}
            </button>
          )
        )}

        <button
          onClick={() => setMoreTag((prevState) => !prevState)}
          className="py-1 px-2 underline text-gray-400 dark:text-gray-300 rounded-3xl mb-2"
        >
          {moreTag ? "Less" : "More"}
        </button>
      </div>
    </div>
  );
};

export default AllTags;
