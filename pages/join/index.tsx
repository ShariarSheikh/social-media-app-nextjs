import Head from "next/head";
import type { NextPage } from "next";
import Form from "./components/Form";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useEffect } from "react";
const cookies = new Cookies();

const Index: NextPage = () => {
  const user = cookies.get(process.env.NEXT_PUBLIC_USER as string);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      router.replace("/");
    }
  }, [router.reload]);

  return (
    <div className="w-full bg-white dark:bg-[#121212]">
      <Head>
        <title>People😎 Dev</title>
        <meta name="description" content="chat application" />
      </Head>

      <main className="w-full min-h-screen">
        <section className="w-full flex flex-row justify-center">
          <Form />
        </section>
      </main>
    </div>
  );
};

export default Index;
