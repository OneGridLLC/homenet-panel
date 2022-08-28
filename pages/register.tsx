import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const DOMAIN = "skribe.dev";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const submitForm: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const { error } = await supabaseClient.auth.signUp({
        email,
        password: password,
      });
      if (error) {
        return setMessage(error.message);
      }

      setMessage("Please check your email for the login link!");
    },
    [email]
  );

  return (
    <div className="flex flex-col lg:flex-row bg-zinc-900 h-[100vh] overflow-auto">
      <Head>
        <meta property="og:title" content="HomeNet" />
        <meta
          property="og:description"
          content="HomeNet is a modern approach to networking with homelabber centric tools and ecosystems!"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://vlcty.host" />
        <meta name="theme-color" content="#3b82f6" />
      </Head>
      <div>
        <div className="lg:w-3/6 p-[3vw]">
          <a href="/">
            <img src="logo.png" className="h-36" />
          </a>
          <p className="text-sm lg:text-xl text-white mt-6">
            Homenet is a modern approach to networking, with homelabber centric
            tools and ecosystems we allow for you to spend your time building
            things, after all, thats why your here isnt it?
          </p>
          {message ? (
            <div className="mt-6">
              <h1 className="bg-green-600 rounded-2xl p-6 text-2xl font-bold text-white">
                {message}
              </h1>
            </div>
          ) : (
            <></>
          )}
          <form className="mt-24" onSubmit={submitForm}>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-white bg-zinc-800 bg-clip-padding  rounded transition ease-in-out m-0 focus:bg-zinc-700 focus:border-red-600 focus:outline-none"
                placeholder="E-Mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-white bg-zinc-800 bg-clip-padding  rounded transition ease-in-out m-0 focus:bg-zinc-700 focus:border-red-600 focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-red-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
