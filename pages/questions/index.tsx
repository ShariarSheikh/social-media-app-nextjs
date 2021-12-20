import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Index";
import SearchByName from "../../Layouts/articles_layouts/SearchByName/SearchByName";
import SearchByTag from "../../Layouts/articles_layouts/SearchByTag/SearchByTag";
import PostListCart from "../../utils/PostListCart/PostListCart";

const Questions: NextPage = () => {

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#121212]">
      <Head>
        <title>People😎 Dev</title>
        <meta name="description" content="chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="w-full min-h-screen mt-16 relative">
        <div className="w-full max-w-[1366px] m-auto mt-24">
          <h1 className="dark:text-gray-400 text-gray-600 text-center text-2xl uppercase">
            Search Questions
          </h1>
          <div className="w-full flex justify-center space-x-5 items-center mt-5">
            <SearchByName />
            <SearchByTag />
          </div>
        </div>
        <section className="w-full max-w-[1366px] relative m-auto overflow-hidden mt-6">
          <PostListCart />
          <PostListCart />
          <PostListCart />
          <PostListCart />
        </section>
      </main>
    </div>
  );
};

export default Questions;
