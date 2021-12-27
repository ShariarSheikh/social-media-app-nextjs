import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const PostThumbnail: FC<{ thumbnail: string; link: string }> = ({
  thumbnail,
  link,
}) => {
  return (
    <>
      <Link href={link} passHref>
        <div className="w-full md:max-h-[450px] max-h-40 h-40 md:h-[200px] relative cursor-pointer">
          <Image
            src={thumbnail}
            alt="post picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
    </>
  );
};

export default PostThumbnail;
