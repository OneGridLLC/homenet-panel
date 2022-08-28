import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { isLoading, user, error } = useUser();

  return isLoading ? (
    <h1>Loading User Info</h1>
  ) : (
    <div className="flex flex-col lg:flex-row bg-zinc-900 h-[100vh] overflow-auto">
      <Head>
        <meta property="og:title" content="Velocity Hosting" />
        <meta
          property="og:description"
          content="Digitalocean level experience, on a lowendtalk level budget!"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://vlcty.host" />
        <meta name="theme-color" content="#3b82f6" />
      </Head>
      <div>
        <div className="lg:w-3/6 p-[3vw]">
          <h1 className="text-[16vw] lg:text-[4vw] mb-0">
            <img src="logo.png" className="h-36" />
          </h1>
          <p className="text-sm lg:text-xl text-white mt-6">
            Homenet is a modern approach to networking, with homelabber centric
            tools and ecosystems we allow for you to spend your time building
            things, after all, thats why your here isnt it?
          </p>
          <div className="mt-4"></div>
          <ul className="text-gray-400 text-sm lg:text-xl list-disc list-inside mt-8">
            <li className="list-none text-2xl mb-2 font-bold">
              Some of our products...
            </li>
            <li>An amazing community!</li>
            <li>IPv4 Shared private Routes</li>
            <li>IPv6 Tunnels</li>
            <li>IPv4 Tunnels</li>
          </ul>
          <div className="flex md:flex-row flex-col mt-[2vh] w-full justify-start gap-3">
            {/* <input className="px-3 py-1 mr-4 bg-zinc-800 text-white text-[16px] outline-none rounded-[8px] w-2/4" /> */}
            {user ? (
              <button
                onClick={() => {
                  window.location.href = "/app";
                }}
                className="px-3 py-1 rounded-[8px] text-[20px] text-white font-semibold bg-gradient-to-br bg-red-600 hover:bg-red-700"
              >
                Access Panel!
              </button>
            ) : (
              <button
                onClick={() => {
                  window.location.href = "/register";
                }}
                className="px-3 py-1 rounded-[8px] text-[20px] text-white font-semibold bg-gradient-to-br bg-red-600 hover:bg-red-700"
              >
                Join Us!
              </button>
            )}
            <button
              onClick={() => {
                window.location.href = "https://discord.gg/hmatHHW2e3";
              }}
              className="px-3 py-1 rounded-[8px] text-[20px] text-white font-semibold bg-gradient-to-br bg-purple-600 hover:bg-purple-700"
            >
              Join the Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
