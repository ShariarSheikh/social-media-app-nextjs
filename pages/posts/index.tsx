import type { NextPage } from "next";
import Head from "next/head";
import SearchByName from "../../utils/SearchBars/SearchByName/SearchByName";
import PostListCart from "../../utils/PostListCart/PostListCart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../redux/post/allPostSlice/allPostSlice";
import LoadingPostList from "../../utils/LoadingPost/LoadingPostList";

const Posts: NextPage = () => {
  const [searchData, setSearchData] = useState([]);
  const { allPost, status, error } = useSelector(getAllPosts);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search) {
      const findingPosts = allPost?.filter((x: any) => {
        return x.postHeader
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      });
      setSearchData(findingPosts);
    } else {
      setSearchData(allPost);
    }
  }, [search, allPost]);

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#121212]">
      <Head>
        <title>People😎 Dev</title>
        <meta name="description" content="chat application" />
      </Head>

      <main className="w-full min-h-screen mt-16 relative px-3">
        <div className="w-full max-w-[1366px] m-auto mt-24">
          <h1 className="dark:text-gray-400 text-gray-600 text-center text-2xl uppercase">
            Search Articles
          </h1>
          <div className="w-full flex justify-center space-x-5 items-center mt-5">
            <SearchByName search={search} setSearch={setSearch} />
          </div>
        </div>
        <section className="w-full max-w-[1366px] relative m-auto overflow-hidden mt-6">
          {status === "pending" && (
            <>
              <LoadingPostList />
              <LoadingPostList />
              <LoadingPostList />
              <LoadingPostList />
              <LoadingPostList />
            </>
          )}
          {status === "success" && allPost.length > 0 && (
            <>
              {searchData.length > 0 &&
                searchData.map((x: any) => (
                  <PostListCart
                    key={x._id}
                    created={x.created}
                    paragraph={x.postParagraph}
                    img={x.postImg}
                    title={x.postHeader}
                    link={`/posts/${x._id}`}
                  />
                ))}
            </>
          )}
          {status === "success" && allPost.length === 0 && <p>0</p>}
          {status === "rejected" && <p>{error}</p>}
          {allPost.length > 0 && searchData.length === 0 && (
            <p>
              No post found at this name
              <span className="text-green-400 font-semibold">
                {" " + search}
              </span>
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Posts;
