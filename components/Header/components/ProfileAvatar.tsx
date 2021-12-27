import Image from "next/image";
import router from "next/router";
import { FC } from "react";

interface ProfileAvatarProps {
  avatar?: string | null | undefined;
  link: string;
  name: string;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ avatar, link, name }) => {
  return (
    <div
      className="h-10 w-10 rounded-full bg-gray-100 relative overflow-hidden"
      onClick={() => router.push(link)}
    >
      {avatar && (
        <Image
          src={avatar}
          alt="profile image"
          layout="fill"
          objectFit="cover"
        />
      )}
      {!avatar && (
        <div className="w-full h-full flex justify-center items-center bg-green-500 font-semibold text-black">
          {name[0]}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
