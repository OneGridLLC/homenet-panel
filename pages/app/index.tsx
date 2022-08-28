import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ActionItem from "../../components/TableItem";
import Navbar from "../../components/Navbar";
import { Table } from "../../components/Table";
import TableItem from "../../components/TableItem";
import React, { useState, useEffect } from "react";
import { NextResponse, NextRequest } from "next/server";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
type IPRecord = {
  type: string;
  "block-subnet": string;
  "assigned-as": string;
  id: number;
  expiration: Date;
};

type SettingsObject = {
  "user-id": string;
  asn: string;
  password: string;
  id: number;
};

type Signup = {
  user_email: string;
  reason: string;
};

const Home: NextPage = () => {
  const { isLoading, user, error } = useUser();
  const [settings, setSettings] = useState<SettingsObject>();
  const [ips, setIPS] = useState<IPRecord[]>([]);

  const [reason, setReason] = useState("");

  const [signups, setSignups] = useState<Signup>();

  useEffect(() => {
    getSettings().then(() => {
      getIPs().then(() => {
        getSignups();
      });
    });
  }, []);

  const getSettings = async () => {
    try {
      let { data, error } = await supabaseClient
        .from("asn-registrations")
        .select("user-id, asn, password, id")
        .eq("user-id", user?.id);

      setSettings(data![0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getIPs = async () => {
    if (!settings) return;

    try {
      let { data, error } = await supabaseClient
        .from("blocks")
        .select("assigned-as, block-subnet, id, type, expiration") // Agent P. Doobie doobie dooba doobie doobie dooba
        .eq("assigned-as", settings.asn);

      setIPS(data!);
    } catch (error) {
      console.error(error);
    }
  };

  const getSignups = async () => {
    try {
      let { data, error } = await supabaseClient
        .from("signups")
        .select("user_email, reason") // Agent P. Doobie doobie dooba doobie doobie dooba
        .eq("user_email", user?.email);

      setSignups(data![0]!);
    } catch (error) {
      console.error(error);
    }
  };

  const createRecord = async (e: any) => {
    e.preventDefault();

    await supabaseClient
      .from("signups")
      .insert([{ user_email: user?.email, reason: reason }])
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-zinc-900">
      <Navbar email={user?.email!} />
      <div className="flex flex-row">
        {/* <div className="h-full w-1/3 p-16">
          <div>
            <h1 className="text-white text-3xl">Local Settings</h1>
            <Table headings={["Key", "Value"]}>
              <TableItem values={["Local ASN", settings?.asn!]} />
              <TableItem values={["BGP Password", settings?.password!]} />
            </Table>
            <button className="ml-auto mt-4 bg-red-500 p-1 px-2 text-sm rounded-xl text-white font-bold">
              Re-Generate BGP Password
            </button>
          </div>
          <div className="h-12" />
          <div>
            <h1 className="text-white text-3xl">Endpoints</h1>
            <div className="">
              <Table
                headings={[
                  "Router Name",
                  "Router IP Address",
                  "Tunnel Address",
                ]}
              >
                <TableItem
                  values={["atlanta-1", "45.132.99.1", "10.99.0.3/31"]}
                />
                <TableItem
                  values={["atlanta-2", "45.132.99.2", "10.99.0.3/31"]}
                />
              </Table>
            </div>
          </div>
        </div> */}
        <div className="h-full w-1/3 p-16">
          {signups ? (
            <h1 className="text-2xl font-semibold text-green-500">
              Thank you for signing up!
            </h1>
          ) : (
            <form className="mt-24" onSubmit={createRecord}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-white bg-zinc-800 bg-clip-padding  rounded transition ease-in-out m-0 focus:bg-zinc-700 focus:border-red-600 focus:outline-none"
                  placeholder="Reason to join"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-red-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Signup for Beta Access
              </button>
            </form>
          )}
        </div>
        <div className="h-full w-1/3 p-16 flex flex-col gap-6">
          <h1 className="text-white text-3xl">Recent News</h1>
          <div className="flex flex-col gap-4 px-2">
            <div className="text-white bg-zinc-800 p-6 rounded-2xl flex flex-col">
              <div className="w-full flex flex-row items-center">
                <h1 className="text-2xl font-bold">Open for Business!</h1>
                <h1 className="text-md text-gray-200 font-bold ml-auto">
                  8/12/2022
                </h1>
              </div>
              <p>
                We have officially launched the platform. Its time to begin the
                next generation of inetrconnected networks, together! We are
                still finishing the panel so its not quite done yet, but its
                very close to being done. SO stand by as we finish some things
                and get it ready for production!
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-1/3 p-16 flex flex-col gap-6">
          <h1 className="text-white text-3xl">Your IP Allocations</h1>
          <div className="flex flex-col gap-4 px-2">
            <div className="p-4 bg-zinc-900 rounded-xl flex flex-col items-center">
              <div className="flex flex-row w-full">
                <h1 className="text-white text-xl font-bold mr-auto">
                  IPv4 Blocks (PUBLIC)
                </h1>
                <button className="ml-auto bg-red-500 p-1 px-2 text-sm rounded-xl text-white font-bold">
                  Buy Now
                </button>
              </div>
              <div className="h-6" />
              <Table
                headings={["IP Block Name", "Assigned ASN", "Renewal Date"]}
              >
                {ips?.map((ip) => (
                  <TableItem
                    values={[ip["block-subnet"], settings?.asn!, "8/16/2022"]}
                    key={ip.id}
                  />
                ))}
              </Table>
            </div>
            <div className="p-4 bg-zinc-900 rounded-xl flex flex-col items-center">
              <div className="flex flex-row w-full">
                <h1 className="text-white text-xl font-bold mr-auto">
                  IPv4 Blocks (PRIVATE)
                </h1>
                <button className="ml-auto bg-red-500 p-1 px-2 text-sm rounded-xl text-white font-bold">
                  Buy Now
                </button>
              </div>
              <div className="h-6" />
              <Table
                headings={["IP Block Name", "Assigned ASN", "Renewal Date"]}
              >
                <TableItem values={["10.254.1.0/24", "AS64515", "8/29/22"]} />
                <TableItem values={["10.254.2.0/24", "AS64515", "8/29/22"]} />
                <TableItem values={["10.254.3.0/24", "AS64515", "8/29/22"]} />
              </Table>
            </div>
            <div className="p-4 bg-zinc-900 rounded-xl flex flex-col items-center">
              <div className="flex flex-row w-full">
                <h1 className="text-white text-xl font-bold mr-auto">
                  IPv6 Blocks (PUBLIC)
                </h1>
                <button className="ml-auto bg-red-500 p-1 px-2 text-sm rounded-xl text-white font-bold">
                  Buy Now
                </button>
              </div>
              <div className="h-6" />
              <Table
                headings={["IP Block Name", "Assigned ASN", "Renewal Date"]}
              >
                <TableItem
                  values={["2602:fed2:7031::/48", "AS64515", "8/29/22"]}
                />
                <TableItem
                  values={["2602:fed2:7032::/48", "AS64515", "8/29/22"]}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10   bg-zinc-800 flex flex-row justify-center items-center gap-12 font-semibold text-zinc-300">
        <Link href="">Service Status</Link>
        <Link href="">Open a Ticket</Link>
      </div>
    </div>
  );
};

export default Home;
