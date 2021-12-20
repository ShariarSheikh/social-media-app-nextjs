import router from "next/router";
import Image from "next/image";
import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";

interface PostHeaderProps {
  avatar?: string;
  name: string;
  posterLink: string;
  postType: string;
}

const PostHeader: FC<PostHeaderProps> = ({
  avatar,
  name,
  posterLink,
  postType,
}) => {
  return (
    <div className="w-full h-16 flex justify-between items-center">
      <div className="w-[70%] h-full flex items-center">
        <div>
          <Avatar avatar={avatar} posterLink={posterLink} />
        </div>
        <div className="h-full flex flex-col justify-center ml-2 ">
          <h1 className="font-medium text-xl dark:text-gray-300 cursor-pointer">
            {name}
          </h1>
          <p className="text-[13px] dark:text-gray-400">
            Post At <span className="font-medium">9:00 AM</span>
          </p>
        </div>
      </div>
      <div className="h-full flex justify-center items-center">
        <div className="mr-7">
          {postType === "question" ? (
            <p className="text-sm py-1 px-2 rounded-xl bg-blue-500 text-white">
              Question
            </p>
          ) : (
            <p className="text-sm py-1 px-2 rounded-xl bg-green-500 text-white">
              Article
            </p>
          )}
        </div>
        <div className="w-7 h-7 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full flex justify-center items-center cursor-pointer duration-200">
          <BsThreeDots/>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;

interface AvatarProps {
  avatar?: string;
  posterLink: string;
}

const Avatar: FC<AvatarProps> = ({ avatar, posterLink }) => {
  return (
    <div
      className="h-12 w-12 rounded-full bg-gray-100 relative overflow-hidden"
      onClick={() => router.push(posterLink)}
    >
      {avatar && (
        <Image
          src={avatar}
          alt="profile image"
          layout="fill"
          objectFit="cover"
        />
      )}
      {!avatar && (
        <div className="w-full h-full flex justify-center items-center">H</div>
      )}
    </div>
  );
};
