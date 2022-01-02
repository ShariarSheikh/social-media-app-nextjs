import { FC } from "react";
import Image from "next/image";
import router from "next/router";

interface PostSection {
  posterProfileId: string;
  posterProfileImg: string;
  posterName: string;
  postHeader: string;
  postParagraph: string;
  created: string;
  postThumbnail: string;
  comments: number;
  reactions: {
    love: number;
    angry: number;
    bad: number;
    fire: number;
  };
}

const PostSection: FC<PostSection> = ({
  posterProfileId,
  posterProfileImg,
  posterName,
  postHeader,
  postParagraph,
  created,
  postThumbnail,
  reactions,
  comments,
}) => {
  return (
    <div className="max-w-3xl w-full p-2">
      <PosterProfile
        posterProfileId={posterProfileId}
        posterProfileImg={posterProfileImg}
        posterName={posterName}
        comments={comments}
        reactions={reactions}
        created={created}
      />
      <div className="w-full mt-9">
        <h1 className="text-xl md:text-4xl font-bold uppercase text-gray-700 dark:text-gray-300 pb-8">
          {postHeader}
        </h1>
        {postThumbnail && (
          <div className="w-full relative h-[300px]">
            <Image
              src={postThumbnail}
              alt={postHeader}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <p className="text-xl text-gray-700 dark:text-gray-300 mt-6">
          {postParagraph}
        </p>
      </div>
    </div>
  );
};

export default PostSection;

const PosterProfile: FC<{
  posterProfileId: string;
  posterProfileImg: string;
  posterName: string;
  comments: number;
  reactions: {
    love: number;
    angry: number;
    bad: number;
    fire: number;
  };
  created: string;
}> = ({
  posterProfileId,
  posterProfileImg,
  posterName,
  comments,
  reactions,
  created,
}) => {
  const data = new Date(created);
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();

  return (
    <div className="w-full flex flex-col md:flex-row pb-1 items-center justify-between min-h-20 relative border-b dark:border-gray-600">
      <div className="w-full flex items-center justify-start h-full">
        <div
          className="w-[40px] h-[40px] relative flex justify-center items-center cursor-pointer"
          onClick={() => router.push(`/peoples?name=${posterName}`)}
        >
          {posterProfileImg && (
            <Image
              src={posterProfileImg}
              alt="profile image"
              objectFit="cover"
              layout="fill"
              className="rounded-full overflow-hidden"
            />
          )}
          {!posterProfileImg && (
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex justify-center items-center"></div>
          )}
        </div>

        <div className="text-gray-600 flex-col justify-start items-start flex dark:text-gray-400 ml-4">
          <h2
            onClick={() => router.push(`/peoples?name=${posterName}`)}
            className="font-semibold text-center text-xl uppercase cursor-pointer text-gray-600 dark:text-gray-300"
          >
            {posterName}
          </h2>
          <div className="flex text-sm justify-center space-x-2">
            <p>
              <span className="font-medium">0</span> Following
            </p>
            <p>
              <span className="font-medium">0</span> Followers
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-grow mt-7 pr-5 text-sm">
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
          <p>Posted: {day + " /" + month + "/ " + year} </p>
          <p>
            Reactions:{" "}
            <strong>
              {reactions?.love +
                reactions?.bad +
                reactions?.angry +
                reactions?.fire}
            </strong>
          </p>
          <p>
            Comments:
            <strong className="ml-2">{comments}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
