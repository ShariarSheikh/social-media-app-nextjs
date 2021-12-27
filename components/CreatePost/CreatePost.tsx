import React, { FC, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {
  createPost,
  openCreatePost,
  uploadPost,
} from "../../redux/post/createPostSlice/createPostSlice";

const cookies = new Cookies();

interface tagList {
  id: number;
  tag: string;
  color: string;
  bg: string;
}
interface ErrorInput {
  field: string;
  error: string;
}

const ArticleTags = [
  {
    id: 1,
    bg: "bg-[#F0DB4F]",
    color: "text-black",
    tag: "JavaScript",
  },
  {
    id: 2,
    bg: "bg-[#3C873A]",
    color: "text-gray-200",
    tag: "Node Js",
  },
  {
    id: 3,
    bg: "bg-[#FFD43B]",
    color: "text-black",
    tag: "Python",
  },
  {
    id: 4,
    bg: "bg-[#B0B3D6]",
    color: "text-black",
    tag: "PHP",
  },
  {
    id: 5,
    bg: "bg-[#61DBFB]",
    color: "text-black",
    tag: "React Js",
  },
  {
    id: 6,
    bg: "bg-[#000000]",
    color: "text-gray-200",
    tag: "Next Js",
  },
  {
    id: 7,
    bg: "bg-[#007acc]",
    color: "text-gray-200",
    tag: "Typescript",
  },
  {
    id: 8,
    bg: "bg-[#29beb0]",
    color: "text-gray-200",
    tag: "GO",
  },
  {
    id: 9,
    bg: "bg-[#092e20]",
    color: "text-gray-200",
    tag: "Django",
  },
  {
    id: 10,
    bg: "bg-[#B52E31]",
    color: "text-gray-200",
    tag: "Angular Js",
  },
  {
    id: 11,
    bg: "bg-[#41B883]",
    color: "text-gray-200",
    tag: "Vue Js",
  },
  {
    id: 12,
    bg: "bg-[#F05340]",
    color: "text-gray-200",
    tag: "Laravel",
  },
  {
    id: 13,
    bg: "bg-[#303030]",
    color: "text-gray-200",
    tag: "Express Js",
  },
];

const CreatePost = () => {
  const [postType, setPostType] = useState<string>("Article");
  const [postHeader, setPostHeader] = useState<string>("");
  const [postImg, setPostImg] = useState<FileList | any>();
  const [postParagraph, setPostParagraph] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<tagList[]>([]);
  const [tagList, setTagList] = useState<tagList[]>([]);
  const [closeTagList, setCloseTagList] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<ErrorInput>({
    field: "",
    error: "",
  });

  const { isCreatePost, status, error } = useSelector(createPost);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(openCreatePost());
  };

  //create tag list
  const searchTag = (keyword: string) => {
    if (keyword) {
      setCloseTagList(true);
      const newTag = ArticleTags.filter((value) => {
        return value.tag
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase());
      });
      setTagList(newTag);
    } else if (!keyword) {
      setCloseTagList(false);
    }
  };

  //addTags
  const addTag = (id: number, tag: string, bg: string, color: string) => {
    const newTag: tagList = { id, tag, bg, color };

    const isExist = ArticleTags.filter((v) => v.id === id);
    const isSelected = selectedTags.find((v) => v.id === id);

    if (isExist && selectedTags.length === 0) {
      setSelectedTags([newTag, ...selectedTags]);
    } else if (isExist && !isSelected && selectedTags.length !== 3) {
      setSelectedTags([newTag, ...selectedTags]);
    }
  };

  //remove selectedTags
  const removeSelectedTags = (id: number) => {
    const newTagList = selectedTags.filter((x) => x.id !== id);
    setSelectedTags(newTagList);
  };

  //create post
  const createPostHandler = () => {
    if (
      !postType ||
      !postHeader ||
      !postParagraph ||
      selectedTags.length === 0
    ) {
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

      selectedTags.length === 0 &&
        setErrorInput({
          ...errorInput,
          field: "SelectedTags",
          error: "Please Select Minimum One Tags",
        });
    } else {
      const storeSelectTags: any = selectedTags.map((x) => {
        const tagsListArray = x.tag;
        return tagsListArray;
      });
      const userProfile = cookies.get("uProfile");

      const profileImg = userProfile?.profileImg;
      const name = userProfile?.name;
      const profileId = userProfile?.profileId;

      const data = new FormData();
      data.append("postType", postType);
      data.append("postImg", postImg);
      data.append("postHeader", postHeader);
      data.append("postParagraph", postParagraph);
      data.append("selectedTags", storeSelectTags);
      data.append("profileImg", profileImg);
      data.append("name", name);
      data.append("profileId", profileId);

      dispatch(uploadPost(data));
    }

    setTimeout(() => {
      setErrorInput({ ...errorInput, field: "", error: "" });
    }, 10000);
  };

  return (
    <div className="w-full min-h-screen bg-black bg-opacity-50 fixed top-[55px] z-50">
      <div className="relative h-[100vh] overflow-y-scroll hide_scroll_bar w-auto my-6 mx-auto max-w-3xl lg:mt-10">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full pb-20 lg:pb-0 bg-white dark:bg-[#141414] outline-none focus:outline-none">
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

            {/* group */}
            <div className="flex flex-col w-full mb-4 justify-between items-center bg-gray-100 dark:bg-[#202122] rounded-lg px-3 relative">
              {closeTagList && tagList.length > 0 && (
                <ul className="absolute max-h-[300px] bottom-10 w-full px-5 py-2 overflow-y-scroll z-50  bg-gray-200 dark:bg-[#202122]">
                  <div className="w-full flex justify-end h-10">
                    <AiOutlineClose
                      onClick={() => setCloseTagList(false)}
                      className="w-5 h-5 cursor-pointer dark:text-gray-400 text-gray-600 text-right"
                    />
                  </div>
                  {tagList?.map(({ id, tag, bg, color }) => (
                    <li
                      key={id}
                      onClick={() => addTag(id, tag, bg, color)}
                      className="active:scale-95 duration-150 w-full text-gray-600 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600 h-9 mb-1 cursor-pointer"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {errorInput.field === "SelectedTags" && errorInput.error && (
                <p className="text-sm text-red-500 text-left">
                  {errorInput.error}
                </p>
              )}
              <input
                type="text"
                placeholder="Search the tags that you want to add on your post"
                className="w-full h-10 px-3 text-gray-600 dark:text-gray-300 outline-none rounded-lg bg-transparent"
                onChange={(e) => searchTag(e.target.value)}
              />
            </div>

            {/* group */}
            <div className="flex w-full justify-between items-center rounded-lg px-3">
              <div className="dark:text-gray-400 text-gray-600">
                <small>You can select maximum 3 tags for your post</small>
                <ul className="w-full flex space-x-2 mt-2">
                  {selectedTags.map((x) => (
                    <li
                      className={`underline font-semibold flex space-x-6 items-center py-2 px-3 ${x.bg} ${x.color}`}
                      key={x.id}
                    >
                      {x.tag}
                      <AiOutlineClose
                        className="w-4 h-4 ml-2 cursor-pointer"
                        onClick={() => removeSelectedTags(x.id)}
                      />
                      ,
                    </li>
                  ))}
                </ul>
              </div>
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

export default CreatePost;

const Header: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className="flex items-start justify-between p-5 border-b dark:border-[#3d3c3c] border-gray-100 rounded-t">
      <h3 className="text-3xl font-semibold text-gray-500 dark:text-gray-400">
        Create a new Post
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
  const { isCreatePost, status, error } = useSelector(createPost);

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
            Create
          </button>
        </>
      )}
    </div>
  );
};
