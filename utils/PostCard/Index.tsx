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
  comments: number;
  reactions: {
    love: number;
    angry: number;
    bad: number;
    fire: number;
  };
  created: string;
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
  comments,
  reactions,
  created,
}) => {
  const link = `/posts/${postLink}`;

  return (
    <div className="w-full min-h-[250px] pb-3 border border-gray-100 dark:border-[#242424] px-3 rounded-md mb-8">
      {/* header */}
      <PostHeader
        avatar={avatar}
        name={name}
        posterLink={posterLink}
        postType={postType}
        created={created}
      />
      <PostText
        textHeader={textHeader}
        textParagraph={textParagraph}
        postLink={link}
      />
      {thumbnail && <PostThumbnail thumbnail={thumbnail} link={link} />}

      <PostActions
        postLink={link}
        postId={postLink}
        postType={postType}
        comments={comments}
        reaction={reactions}
      />
    </div>
  );
};

export default PostCard;
