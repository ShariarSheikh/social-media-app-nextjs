import Image from "next/image";
import { FC } from "react";

const PostThumbnail: FC<{ thumbnail: string }> = ({ thumbnail }) => {
  return (
    <div className="w-full max-h-[450px] h-[300px] relative">
      <Image src={thumbnail} alt="post picture" layout="fill"  objectFit="cover"/>
    </div>
  );
};

export default PostThumbnail;
