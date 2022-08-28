import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  children: JSX.Element[] | JSX.Element;
  headings: String[];
};

const Table: React.FC<Props> = ({ children, headings }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-white border-bottom border-solid border-b-2 border-zinc-800 font-bold">
          {headings.map((heading) => (
            <td>{heading}</td>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export { Table };
