import React, { FC, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { fetchMyPost } from "../../../../redux/post/getMyPostSlice/getMyPostSlice";
import {
  fetchUpdatePost,
  openUpdatePost,
  updatePost,
} from "../../../../redux/post/updatePostSlice/updatePostSlice";

const cookies = new Cookies();

interface ErrorInput {
  field: string;
  error: string;
}
interface updatePostUseSelector {
  isUpdate: boolean;
  status: string;
  error: string;
  postData: {
    img: string;
    postHeader: string;
    postParagraph: string;
    imgFileName: string;
    id: string;
    postType: string;
    tags: string[];
  };
}

const EditPost = () => {
  const [postType, setPostType] = useState<string>("Article");
  const [postHeader, setPostHeader] = useState<string>("");
  const [postImg, setPostImg] = useState<any>();
  const [postParagraph, setPostParagraph] = useState<string>("");
  const [errorInput, setErrorInput] = useState<ErrorInput>({
    field: "",
    error: "",
  });

  const { isUpdate, status, error, postData } = useSelector(
    updatePost
  ) as unknown as updatePostUseSelector;
  const dispatch = useDispatch();

  const closeModal = () => {
    const editData = {
      open: false,
      postData: {},
    };
    dispatch(openUpdatePost(editData));
  };
  //edit post
  const createPostHandler = () => {
    if (!postType || !postHeader || !postParagraph) {
      !postType &&
        setErrorInput({
          ...errorInput,
          field: "PostType",
          error: "Please Select Post Type",
        });

      !postHeader &&
        setErrorInput({
          ...errorInput,
          field: "PostHeader",
          error: "Please Fill PostHeader Input",
        });

      !postParagraph &&
        setErrorInput({
          ...errorInput,
          field: "PostParagraph",
          error: "Please Fill PostParagraph Input",
        });
    } else {
      const data = new FormData();
      data.append("postType", postType);
      data.append("postImg", postImg);
      data.append("postHeader", postHeader);
      data.append("postParagraph", postParagraph);
      data.append("postId", postData?.id);
      postImg && data.append("imgFileName", postData?.imgFileName);

      dispatch(fetchUpdatePost(data));
    }

    setTimeout(() => {
      setErrorInput({ ...errorInput, field: "", error: "" });
    }, 10000);
  };

  useEffect(() => {
    if (isUpdate) {
      setPostType(postData.postType);
      setPostHeader(postData.postHeader);
      setPostParagraph(postData.postParagraph);
    }
  }, [isUpdate, postData]);

  return (
    <div className="w-full min-h-screen bg-black bg-opacity-50 fixed top-[55px] z-50">
      <div className="relative h-[100vh] overflow-y-scroll hide_scroll_bar w-auto my-6 mx-auto max-w-3xl lg:mt-10">
        <div className="border-0 pb-20 lg:pb-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-[#141414] outline-none focus:outline-none">
          <Header closeModal={closeModal} />
          <form className="relative p-6 flex-auto">
            {/* group */}
            <div className="flex justify-start flex-col mb-5">
              <label
                htmlFor="Select Post Type"
                className="text-gray-500 dark:text-gray-400"
              >
                Select Post Type
              </label>
              {errorInput.field === "PostType" && errorInput.error && (
                <p className="text-sm text-red-500">{errorInput.error}</p>
              )}
              <select
                required
                className="text-gray-500 dark:text-gray-400 outline-none h-10 rounded-lg px-3 mt-1 bg-gray-100 dark:bg-[#202122]"
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
              >
                <option value="Article">Article</option>
                <option value="Question">Question</option>
              </select>
            </div>

            {/* group */}
            <div className="flex justify-start flex-col mb-5">
              {errorInput.field === "PostHeader" && errorInput.error && (
                <p className="text-sm text-red-500">{errorInput.error}</p>
              )}
              <input
                required
                type="text"
                placeholder="Post Header"
                className="h-10 px-3 text-gray-600 dark:text-gray-300 outline-none rounded-lg bg-gray-100 dark:bg-[#202122]"
                value={postHeader}
                onChange={(e) => setPostHeader(e.target.value)}
              />
            </div>

            {/* group */}
            <div className="flex justify-start flex-col mb-5">
              <input
                required
                type="file"
                placeholder="Post Header"
                className="h-10 px-3 text-gray-600 dark:text-gray-300 outline-none rounded-lg bg-gray-100 dark:bg-[#202122]"
                // value={postImg}
                onChange={(e: any) => setPostImg(e.target.files[0])}
              />
            </div>

            {/* group */}
            <div className="flex justify-start flex-col mb-5">
              {errorInput.field === "PostParagraph" && errorInput.error && (
                <p className="text-sm text-red-500">{errorInput.error}</p>
              )}
              <textarea
                required
                placeholder="Post Paragraph"
                className="min-h-[300px] p-3 text-gray-600 dark:text-gray-300 outline-none rounded-lg bg-gray-100 dark:bg-[#202122]"
                value={postParagraph}
                onChange={(e) => setPostParagraph(e.target.value)}
              />
            </div>
          </form>

          <Footer
            closeModal={closeModal}
            createPostHandler={createPostHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPost;

const Header: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className="flex items-start justify-between p-5 border-b dark:border-[#3d3c3c] border-gray-100 rounded-t">
      <h3 className="text-3xl font-semibold text-gray-500 dark:text-gray-400">
        Edit Post
      </h3>

      <AiOutlineClose
        onClick={closeModal}
        className="w-6 h-6 cursor-pointer text-gray-500 dark:text-gray-400"
      />
    </div>
  );
};

const Footer: FC<{ closeModal: () => void; createPostHandler: () => void }> = ({
  closeModal,
  createPostHandler,
}) => {
  const { isUpdate, status, error } = useSelector(updatePost);

  return (
    <div className="flex items-center justify-end h-12 border-t dark:border-[#333333] border-gray-100 rounded-b">
      {status === "pending" ? (
        <button
          className="dark:text-gray-300 w-full text-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          Loading..
        </button>
      ) : (
        <>
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="dark:text-gray-300 text-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={createPostHandler}
          >
            Update
          </button>
        </>
      )}
    </div>
  );
};
