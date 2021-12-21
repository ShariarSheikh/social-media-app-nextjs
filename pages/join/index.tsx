import Head from "next/head";
import type { NextPage } from "next";
import Protected from "../../HOC/Protected";
import Header from "../../components/Header/Index";
import Form from "./components/Form";


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

Index.displayName = "Index";
export default Protected(Index);
