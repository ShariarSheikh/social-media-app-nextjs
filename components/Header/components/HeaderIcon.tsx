import router from "next/router";
import { useDispatch } from "react-redux";
import { openCreatePost } from "../../../redux/post/createPostSlice/createPostSlice";

const HeaderIcon = ({
  Icon,
  link,
  badge,
  isDispatch,
}: {
  Icon: JSX.Element;
  link: string;
  badge?: number | undefined;
  isDispatch?: string;
}) => {
  const dispatch = useDispatch();

  const iconHandler = () => {
    link && router.push(link);
    if (isDispatch === "createPost") {
      dispatch(openCreatePost());
    }
  };

  return (
    <div
      className="cursor-pointer hover:scale-125 duration-200 relative"
      onClick={iconHandler}
    >
      {Icon && Icon}
      {badge && (
        <div
          className="h-[18px] w-[18px] flex justify-center items-center text-[11px] rounded-full
         overflow-hidden bg-green-500 text-white absolute -top-3 -right-1"
        >
          {badge}
        </div>
      )}
    </div>
  );
};

export default HeaderIcon;
