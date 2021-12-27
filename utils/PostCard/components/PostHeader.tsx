import router from "next/router";
import Image from "next/image";
import { FC } from "react";

interface PostHeaderProps {
  avatar?: string;
  name: string;
  posterLink: string;
  postType: string;
  created: string;
}

const PostHeader: FC<PostHeaderProps> = ({
  avatar,
  name,
  posterLink,
  postType,
  created,
}) => {
  const data = new Date(created);
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();
  return (
    <div className="w-full h-16 flex justify-between items-center">
      <div className="w-[70%] h-full flex items-center">
        <div>
          <Avatar avatar={avatar} posterLink={posterLink} name={name} />
        </div>
        <div className="h-full flex flex-col justify-center ml-2 ">
          <h1
            className="font-medium text-base md:text-xl dark:text-gray-300 cursor-pointer"
            onClick={() => router.push(`/peoples?name=${name}`)}
          >
            {name}
          </h1>
          <p className="text-[13px] dark:text-gray-400">
            Posted
            <span className="font-medium ml-2">
              {day + " " + month + " " + year}
            </span>
          </p>
        </div>
      </div>
      <div className="h-full flex justify-center items-center">
        <div className="mr-3">
          {postType === "Question" ? (
            <p className="text-sm py-1 px-2 rounded-xl bg-blue-500 text-white">
              Question
            </p>
          ) : (
            <p className="text-sm py-1 px-2 rounded-xl bg-green-500 text-white">
              Article
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;

interface AvatarProps {
  avatar?: string;
  posterLink: string;
  name: string;
}

const Avatar: FC<AvatarProps> = ({ avatar, posterLink, name }) => {
  return (
    <div
      className="h-12 w-12 rounded-full dark:bg-gray-800 bg-gray-100 relative overflow-hidden"
      onClick={() => router.push(`/peoples?name=${name}`)}
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
        <div className="w-full h-full flex justify-center items-center">
          {name[0]}
        </div>
      )}
    </div>
  );
};
