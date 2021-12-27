import Image from "next/image";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchDeletePost,
} from "../../../redux/post/deletePostSlice/deletePostSlice";
import {
  fetchMyPost,
  getMyPost,
} from "../../../redux/post/getMyPostSlice/getMyPostSlice";
import {
  openUpdatePost,
  updatePost,
} from "../../../redux/post/updatePostSlice/updatePostSlice";

interface DataComponent {
  _id: string;
  name: string;
  email: string;
  profileImg: string;
  created: string;
}

const Post: FC<{ data: DataComponent }> = ({ data }) => {
  const { allPost } = useSelector(getMyPost);
  const { status } = useSelector(updatePost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyPost());
  }, [dispatch, data]);

  useEffect(() => {
    status === "success" && dispatch(fetchMyPost());
  }, [dispatch, status]);

  return (
    <div className="mt-10 w-full bg-white dark:bg-[#161718] px-4 lg:-px-0">
      <h1 className="font-medium">Post</h1>
      <div className="w-full flex justify-start mt-3 flex-wrap">
        {allPost.length > 0 && (
          <>
            {allPost.map((x: any) => (
              <PostCart
                myId={data?._id}
                key={x._id}
                img={x.postImg}
                postHeader={x.postHeader}
                postParagraph={x.postParagraph}
                id={x._id}
                imgFileName={x.imgFileName}
                tags={x.tags}
                postType={x.postType}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;

const PostCart: FC<{
  img: string;
  postHeader: string;
  postParagraph: string;
  id: string;
  imgFileName: string;
  myId: string;
  tags: string[];
  postType: string;
}> = ({
  img,
  postHeader,
  postParagraph,
  id,
  imgFileName,
  myId,
  tags,
  postType,
}) => {
  const { status, error } = useSelector(deletePost);
  const dispatch = useDispatch();

  const deletePostHandler = () => {
    const isOk = prompt(
      "Are you sure want to delete this post? If your are then write ===> yes"
    );
    const deleteKey = { id, imgFileName };
    isOk?.toLocaleLowerCase() === "yes" && dispatch(fetchDeletePost(deleteKey));

    isOk?.toLocaleLowerCase() !== "yes" &&
      alert(`Your input is invalid!); make sure you write yes in input`);
  };

  const editPostHandler = () => {
    const storePost = {
      img,
      postHeader,
      postParagraph,
      id,
      imgFileName,
      tags,
      postType,
    };
    const editData = {
      open: true,
      postData: storePost,
    };

    dispatch(openUpdatePost(editData));
  };

  useEffect(() => {
    status === "success" && dispatch(fetchMyPost());
  }, [status, dispatch, myId]);
  return (
    <div className="min-w-[320px] w-[20%] min-h-[320px] p-2 mb-4 mr-3 h-full border dark:border-gray-600 rounded-md relative">
      <div className="h-[120px] w-full overflow-hidden relative">
        {img && (
          <Image src={img} alt="post img" objectFit="cover" layout="fill" />
        )}
        {!img && <div>No image found</div>}
      </div>
      <div className="w-full">
        <h1 className="font-bold text-xl mt-3 text-gray-600 dark:text-gray-300 line-clamp-2">
          {postHeader}
        </h1>
        <p className="font-normal mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
          {postParagraph}
        </p>

        {status === "pending" ? (
          <div className="w-full flex justify-center items-center">
            Please wait...
          </div>
        ) : (
          <div className="w-full items-center flex justify-between absolute bottom-0 px-3 h-12 text-gray-600 dark:text-gray-400">
            <button
              onClick={editPostHandler}
              className="py-1 px-2 active:scale-95 duration-150 cursor-pointer outline-none"
            >
              Edit Post
            </button>
            <button
              onClick={deletePostHandler}
              className="py-1 px-2 active:scale-95 duration-150 cursor-pointer outline-none"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
