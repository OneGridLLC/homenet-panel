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
  values: String[];
};

const TableItem: React.FC<Props> = ({ values }) => {
  return (
    <tr className="text-white border-bottom border-solid border-b-2 border-zinc-800 ">
      {values.map((value) => (
        <td key={`${value}`}>{value}</td>
      ))}
    </tr>
  );
};

export default TableItem;
