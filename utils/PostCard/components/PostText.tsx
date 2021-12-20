import { FC } from "react";
import Link from "next/link";

interface PostTextProps {
  textHeader?: string;
  textParagraph?: string;
  postLink: string;
}

const PostText: FC<PostTextProps> = ({
  textHeader,
  textParagraph,
  postLink,
}) => {
  return (
    <div className="w-full py-4 dark:text-gray-400 text-gray-800">
      <h1 className="font-bold text-3xl">
        <Link href={postLink} passHref>
          <a>{textHeader}</a>
        </Link>
      </h1>
      <p className="mt-2 line-clamp-3">{textParagraph}</p>
    </div>
  );
};

export default PostText;
