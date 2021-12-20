import Image from "next/image";
import router from "next/router";

const Index = () => {


  function logOutUser() {
    signOut();
    router.replace("/join");
  }

  return (
    <div className="w-full border dark:border-[#302e2e] p-2 mt-5">
      <div className="w-full flex justify-center items-center h-10">
        {false && (
          <Image
            src={session?.user?.image}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full overflow-hidden"
          />
        )}
      </div>
      {false && (
        <div className="mt-1 text-gray-600 dark:text-gray-400">
          <h2 className="font-semibold text-center">{session.user.name}</h2>
          <div className="mt-3 flex w-full text-sm justify-center space-x-2">
            <p>
              <span className="font-medium">0</span> Following
            </p>
            <p>
              <span className="font-medium">0</span> Followers
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center items-center mt-6">
        <button
          onClick={() => logOutUser()}
          className="bg-gray-100 w-full h-9 font-semibold dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-100 active:scale-105 duration-100"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Index;
