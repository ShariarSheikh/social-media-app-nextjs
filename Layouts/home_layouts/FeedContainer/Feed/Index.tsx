import { FC } from "react";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../../../redux/post/allPostSlice/allPostSlice";
import LoadingPost from "../../../../utils/LoadingPost/LoadingPost";
import PostCard from "../../../../utils/PostCard/Index";

const Feed: FC = () => {
  const { allPost, status, error } = useSelector(getAllPosts);

  return (
    <div className="w-full mt-5">
      {status === "pending" && (
        <>
          <LoadingPost />
          <LoadingPost />
          <LoadingPost />
        </>
      )}
      {status === "success" && (
        <>
          {allPost.length > 0 &&
            allPost?.map((x: any) => (
              <PostCard
                key={x._id}
                name={x.posterName}
                posterLink={x.posterProfileId}
                postLink={x._id}
                postType={x.postType}
                textHeader={x.postHeader}
                textParagraph={x.postParagraph}
                thumbnail={x.postImg}
                avatar={x.posterProfileImg}
                comments={x.comments}
                reactions={x.reactions}
                created={x.created}
              />
            ))}
        </>
      )}
      {status === "success" && allPost.length === 0 && <p>0 Post</p>}
      {status === "rejected" && <p>{error}</p>}
    </div>
  );
};

export default Feed;
