import { FC, useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoggedIn,
  profileImgUpdate,
} from "../../../redux/userLoginSlice/userLoginSlice";
const cookies = new Cookies();

const ProfileImg: FC = () => {
  const user = cookies.get("uProfile");
  const { imgError, imgStatus } = useSelector(isLoggedIn);
  const [images, setImages] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");

  const dispatch = useDispatch();

  //selectImg Img
  const selectImg = (e: any) => {
    setImages(e.target.files[0]);
  };

  //selectImg Img
  const uploadImg = () => {
    const id: string = user?.profileId;
    const isUpload: any = user?.profileImg ? false : true;
    const imagesFileName: string = user?.imgFileName ? user?.imgFileName : "";

    const data = new FormData();
    data.append("profileImg", images);
    data.append("id", id);
    data.append("isUpload", isUpload);
    !isUpload && data.append("imagesFileName", imagesFileName);

    dispatch(profileImgUpdate(data));
  };

  useEffect(() => {
    const x = user?.profileImg;
    setProfileImg(x);
    if (imgStatus === "success") {
      setImages("");
      setProfileImg(x);
    }
  }, [imgStatus]);

  imgError && alert(imgError);

  return (
    <>
      <div className="min-w-28 ml-8 mt-10 w-full min-h-28 z-20 m-auto flex justify-center items-center rounded-full">
        {!profileImg && (
          <div className="w-28 h-28 rounded-full overflow-hidden flex justify-center items-center">
            <AiOutlineUser className="w-full h-full bg-gray-200 text-gray-600" />
          </div>
        )}

        {profileImg && (
          <Image
            className="overflow-hidden p-3 rounded-full"
            src={profileImg}
            alt="user profile"
            width={112}
            height={112}
            objectFit="cover"
          />
        )}

        <div className="relative flex justify-center items-center">
          {/* select img */}
          <div className="w-12 h-12 overflow-hidden rounded-full flex justify-center items-center cursor-pointer relative right-6 border-2 border-blue-400">
            <input
              onChange={(e) => selectImg(e)}
              type="file"
              multiple={false}
              className="opacity-0 w-full h-12 z-30 absolute top-0 cursor-pointer"
            />
            <AiOutlineEdit
              className="hover:text-blue-400 active:scale-110 duration-200 w-12 h-12 p-3
           rounded-full text-black bg-gray-50"
            />
          </div>

          {images && (
            <div
              className="hover:text-blue-400 active:scale-110 duration-200 py-2 px-3 p-3 rounded-full 
              text-black bg-gray-50 absolute -right-20 shadow-lg border-2 border-blue-400 cursor-pointer"
              onClick={() => imgStatus !== "pending" && uploadImg()}
            >
              {imgStatus === "pending" ? "Uploading" : "Upload"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileImg;
