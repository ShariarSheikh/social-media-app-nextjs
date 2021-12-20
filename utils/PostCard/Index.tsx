import React, { FC } from "react";
import PostActions from "./components/PostActions";
import PostHeader from "./components/PostHeader";
import PostText from "./components/PostText";
import PostThumbnail from "./components/PostThumbnail";

interface PostProps {
  avatar?: string;
  thumbnail?: string | null;
  name: string;
  posterLink: string;
  postLink: string;
  textHeader?: string;
  textParagraph?: string;
  postType: string;
}

const PostCard: FC<PostProps> = ({
  avatar,
  thumbnail,
  name,
  posterLink,
  postLink,
  textHeader,
  textParagraph,
  postType,
}) => {
  return (
    <div className="w-full  pb-3 border border-gray-100 dark:border-[#242424] px-3 rounded-md mb-8">
      {/* header */}
      <PostHeader
        avatar={avatar}
        name={name}
        posterLink={posterLink}
        postType={postType}
      />
      <PostText
        textHeader={textHeader}
        textParagraph={textParagraph}
        postLink={postLink}
      />
      {thumbnail && <PostThumbnail thumbnail={thumbnail} />}

      <PostActions postType={postType} />
    </div>
  );
};

export default PostCard;
