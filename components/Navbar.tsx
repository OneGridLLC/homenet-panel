import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  faCog,
  faCogs,
  faGauge,
  faGear,
  faMoneyBill,
  faServer,
  faTicket,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  email: string;
};

const Navbar: React.FC<Props> = ({ email }) => {
  return (
    <div className="flex flex-row w-screen h-12 bg-red-500 items-center justify-center px-2 gap-3">
      <Link href="/app">
        <img src="logo.png" className="h-14 " />
      </Link>
      {/* <input
        type={"text"}
        placeholder="Search for Items"
        className="rounded-2xl p-2 px-4 w-1/6 bg-red-400 text-white outline-white placeholder-white"
      /> */}
      <Link href="#">
        <div className="flex flex-row gap-5 items-center ml-auto text-white font-semibold cursor-poniter select-none">
          <p>{email}</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
