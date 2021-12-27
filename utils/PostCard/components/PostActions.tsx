import { FC, useState } from "react";
import { AiOutlineSave, AiOutlineShareAlt } from "react-icons/ai";
import { MdReportGmailerrorred } from "react-icons/md";
import Image from "next/image";
import { VscReactions } from "react-icons/vsc";
import router from "next/router";

interface PostActions {
  postType: string;
  comments: number;
  postId: string;
  postLink: string;
  reaction: {
    love: number;
    angry: number;
    bad: number;
    fire: number;
  };
}

const ReactionsEmoji = [
  { id: 1, src: "/reaction-icons/love.svg", alt: "love" },
  { id: 2, src: "/reaction-icons/fire.svg", alt: "fire" },
  { id: 3, src: "/reaction-icons/angry.svg", alt: "angry" },
  { id: 4, src: "/reaction-icons/poti.svg", alt: "bad" },
];

const PostActions: FC<PostActions> = ({
  postType,
  comments,
  reaction,
  postId,
  postLink,
}) => {
  const [isReaction, setIsReaction] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center justify-between h-12 mt-5 font-thin dark:text-[#9ca3af] text-black relative">
      {isReaction && <AllReaction setIsReaction={setIsReaction} />}
      <div
        className="py-2 md:px-3 flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full overflow-hidden cursor-pointer"
        onClick={() => setIsReaction((prevState) => !prevState)}
      >
        <VscReactions className="w-6 h-6 text-blue-400" />
      </div>
      <div className="post-action-btn" onClick={() => router.push(postLink)}>
        {comments} Comments
      </div>
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

const AllReaction: FC<{ setIsReaction: (isReaction: boolean) => void }> = ({
  setIsReaction,
}) => {
  return (
    <div className="h-[50px] w-56 absolute -top-14 -left-1 bg-white dark:bg-[#121212] rounded-full">
      <div className="flex h-full justify-evenly items-center space-x-2">
        {ReactionsEmoji.map(({ id, src, alt }) => (
          <div
            key={id}
            className="post-reaction-btn"
            onClick={() => setIsReaction(false)}
          >
            <Image src={src} alt={alt} width={35} height={35} />
          </div>
        ))}
      </div>
    </div>
  );
};
