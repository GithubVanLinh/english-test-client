"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-200 justify-center items-center flex">
      <div className="flex flex-row gap-10">
        <Link
          className="p-2 border border-blue-200 rounded hover:bg-blue-200"
          href="/add"
        >
          add
        </Link>
        <Link
          className="p-2 border border-blue-200 rounded hover:bg-blue-200"
          href="/test"
        >
          take a test
        </Link>
        <h1>{process.env.NEXT_PUBLIC_URL}</h1>
      </div>
    </div>
  );
}
