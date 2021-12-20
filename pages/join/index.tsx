import Head from "next/head";
import type { NextPage } from "next";
import Protected from "../../HOC/Protected";
import Header from "../../components/Header/Index";
import Form from "./components/Form";
import { GetServerSideProps } from "next";


const Index: NextPage = () => {
  return (
    <div className="w-full bg-white dark:bg-[#121212]">
      <Head>
        <title>People😎 Dev</title>
        <meta name="description" content="chat application" />
      </Head>
      <Header />

      <main className="w-full min-h-screen">
        <section className="w-full flex flex-row justify-center">
          <Form  />
        </section>
      </main>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const providers = await getProviders();
//   console.log(providers);
  
//   return {
//     props: {
//       providers,
//     },
//   };
// };

Index.displayName = "Index";
export default Protected(Index);
