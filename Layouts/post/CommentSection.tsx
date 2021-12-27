import { FC } from "react";
import Image from "next/image";

interface CommentSection {
  reactions: string;
  comments: number;
}

const CommentSection: FC<CommentSection> = ({ reactions, comments }) => {
  return (
    <>
      <div className="w-full max-w-3xl mt-40 relative border-t dark:border-gray-600 p-2">
        <div className="w-full flex justify-between items-center px-3">
          <h1 className="font-semibold">CommentSection</h1>
          <p className="text-gray-600 dark:text-gray-400">{comments}</p>
        </div>
        <section className="w-full mt-6 px-3">
          <div className="w-full h-10 rounded-md px-6 flex items-center justify-between bg-gray-100 dark:bg-[#202122]">
            <input
              type="text"
              placeholder="Your Comment"
              className="bg-transparent h-full w-full outline-none"
            />
            <button className="h-full cursor-pointer active:scale-95 duration-200 outline-none">
              Send
            </button>
          </div>

          <div className="w-full mt-5">
            <Comment
              img={
                "https://i.ibb.co/r4B907W/Group-2.png"
              }
              name={"Shariar"}
              commentText={"This is good one you have to agree with me;)"}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default CommentSection;

const Comment: FC<{ img: string; name: string; commentText: string }> = ({
  img,
  name,
  commentText,
}) => {
  return (
    <div className="w-full mb-4 border-b dark:border-[#202122] p-2">
      <div className="w-full flex items-center">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative">
          {img && (
            <Image
              src={img}
              alt="comenter picture"
              layout="fill"
              objectFit="cover"
            />
          )}
          {!img && <div className="w-full h-full bg-green-500"></div>}
        </div>
        <h1 className="font-semibold ml-3 text-xl">{name}</h1>
      </div>
      <p className="mt-3 text-gray-500 dark:text-gray-400">{commentText}</p>
    </div>
  );
};
