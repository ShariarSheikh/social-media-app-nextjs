import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import CommentSection from "../../Layouts/post/CommentSection";
import PostSection from "../../Layouts/post/PostSection";

const Post: NextPage<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#121212]">
      <Head>
        <title>{data?.postHeader}</title>
        <meta name="description" content="chat application" />
      </Head>

      <main className="w-full min-h-[50vh] mt-16 relative">
        <section className="max-w-7xl h-auto flex justify-center items-center flex-col w-full m-auto pb-10">
          <PostSection
            posterProfileImg={data?.posterProfileImg}
            posterName={data?.posterName}
            posterProfileId={data?.posterProfileId}
            postHeader={data?.postHeader}
            postParagraph={data?.postParagraph}
            created={data?.created}
            postThumbnail={data?.postImg}
            reactions={data?.reactions}
            comments={data?.comments}
          />
          <CommentSection
            reactions={data?.reactions}
            comments={data?.comments}
          />
        </section>
      </main>
    </div>
  );
};

export const getStaticPaths = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
  const getAll = await axios.get(
    process.env.NEXT_PUBLIC_GET_ALL_POSTS_URL as string,
    {
      headers: { API_KEY: API_KEY },
    }
  );
  const data = await getAll?.data?.data;
  const path = data.map((x: any) => ({
    params: { id: x._id.toString() },
  }));

  return {
    paths: path,
    fallback: true,
  };
};

interface ID {
  id: string;
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as unknown as ID;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

  const fetchPost = await axios.get(
    `${process.env.NEXT_PUBLIC_GET_SINGLE_POSTS_URL}?id=${id}`,
    {
      headers: { API_KEY: API_KEY },
    }
  );
  const post = await fetchPost?.data?.data;

  if (!post) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return {
    props: { data: post },
    revalidate: 30, //is seconds
  };
};

export default Post;
