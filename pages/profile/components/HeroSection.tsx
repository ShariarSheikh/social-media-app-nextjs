import { FC } from "react";
import ProfileImg from "./ProfileImg";

interface DataComponent {
  _id: string;
  name: string;
  email: string;
  profileImg: string;
  created: string;
}

const HeroSection: FC<{ data: DataComponent }> = ({ data }) => {
  return (
    <div className="w-full bg-white dark:bg-[#161718] px-4 lg:-px-0 mt-16">
      <div className="text-center w-full min-h[300px] pb-4 relative border-[1px] border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <ProfileImg />

        <h1 className="mb-5 mt-2 text-3xl">{data?.name}</h1>
        <p>Developer working on this page! wait for it to finish 😎</p>
      </div>
    </div>
  );
};

export default HeroSection;
