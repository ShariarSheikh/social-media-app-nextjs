import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingUser from "../../utils/LoadingPost/LoadingUser";
import SearchUser from "../../Layouts/peoples/SearchUser";
import UserListCart from "../../Layouts/peoples/UserListCart";

interface Users {
  email: string;
  name: string;
  img: string;
}
interface query {
  name: string;
}

const Peoples: NextPage = () => {
  const [searchData, setSearchData] = useState<Users[]>([]);
  const [search, setSearch] = useState<string>("");
  const [peoples, setPeoples] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { name } = useRouter().query as unknown as query;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
        const response = await axios.get(
          process.env.NEXT_PUBLIC_GET_ALL_USERS_URL as string,
          {
            headers: {
              API_KEY: API_KEY,
            },
          }
        );
        const data = await response?.data?.data;
        setPeoples(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);

  //______________________________if search input have any value
  useEffect(() => {
    if (search) {
      const searchUser = peoples.filter((x) => {
        return x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
      });
      setSearchData(searchUser);
    } else {
      setSearchData(peoples);
    }
  }, [search, setSearch, peoples]);

  //______________________________if query have any search name
  useEffect(() => {
    if (name) {
      const searchUser = peoples.filter((x) => {
        return x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
      });
      setSearchData(searchUser);
    } else {
      setSearchData(peoples);
    }
  }, [name,peoples]);

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#121212]">
      <Head>
        <title>People😎 Dev</title>
        <meta name="description" content="chat application" />
      </Head>

      <main className="w-full min-h-[50vh] mt-16 relative px-3">
        <div className="w-full max-w-[1366px] m-auto mt-24">
          <h1 className="dark:text-gray-400 text-gray-600 text-center text-2xl uppercase">
            Search Peoples
          </h1>
          <div className="w-full flex justify-center space-x-5 items-center mt-5">
            <SearchUser search={search} setSearch={setSearch} />
          </div>
        </div>
        <section className="w-full max-w-[1366px] relative m-auto overflow-hidden mt-9">
          {loading && (
            <>
              <LoadingUser />
              <LoadingUser />
              <LoadingUser />
              <LoadingUser />
            </>
          )}
          {peoples.length > 0 && (
            <>
              {searchData.length > 0 &&
                searchData.map((x: any) => (
                  <UserListCart
                    key={x.email}
                    img={x.profileImg}
                    name={x.name}
                    email={x.email}
                  />
                ))}
            </>
          )}
          {peoples.length > 0 && searchData.length === 0 && (
            <p>
              No user found at this name
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

export default Peoples;
