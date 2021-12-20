import { FC, useState } from "react";
import { AiOutlineSave, AiOutlineShareAlt } from "react-icons/ai";
import { MdReportGmailerrorred } from "react-icons/md";
import Image from "next/image";
import { VscReactions } from "react-icons/vsc";

interface PostActions {
  postType: string;
}

const PostActions: FC<PostActions> = ({ postType }) => {
  const [isReaction, setIsReaction] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center justify-between h-12 mt-5 font-thin dark:text-[#9ca3af] text-black relative">
      {isReaction && <AllReaction />}
      <div
        className="py-2 px-3 flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full overflow-hidden cursor-pointer"
        onClick={() => setIsReaction((prevState) => !prevState)}
      >
        <VscReactions className="w-6 h-6 text-blue-400" />
      </div>
      <div className="post-action-btn">10 Comment</div>
      {postType === "question" && (
        <div className="post-action-btn">5 Answer</div>
      )}

      <div className="post-action-btn">
        <p>Save</p>
        <AiOutlineSave />
      </div>
      <div className="post-action-btn">
        <p>Report</p>
        <MdReportGmailerrorred />
      </div>

      <div className="post-action-btn">
        <p>Share</p>
        <AiOutlineShareAlt />
      </div>
    </div>
  );
};

export default PostActions;

const AllReaction = () => {
  return (
    <div className="h-[50px] w-56 absolute -top-14 -left-1 bg-white dark:bg-[#121212] rounded-full">
      <div className="flex h-full justify-evenly items-center space-x-2">
        <div className="post-reaction-btn">
          <Image
            src="/reaction-icons/love.svg"
            alt="love"
            width={35}
            height={35}
          />
        </div>

        <div className="post-reaction-btn">
          <Image
            src="/reaction-icons/fire.svg"
            alt="love"
            width={35}
            height={35}
          />
        </div>

        <div className="post-reaction-btn">
          <Image
            src="/reaction-icons/angry.svg"
            alt="love"
            width={35}
            height={35}
          />
        </div>

        <div className="post-reaction-btn">
          <Image
            src="/reaction-icons/poti.svg"
            alt="love"
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
};
