'use client';

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [active, setActive] = useState(false)
  return (
    <div className="flex flex-col">
      <div className="flex items-start w-full justify-between">
        <div>
          <h1 className="text-2xl text-primary-500 font-sans font-semibold">Jackson Schacher</h1>
          <span className="font-mono text-sm">Full Stack Engineer</span><br />
          <span className="font-mono text-sm opacity-50">UI/UX Designer</span><br />
          <span className="font-mono text-sm opacity-25">Web App Dev</span><br />
          <span className="font-mono text-sm opacity-10">Software Developer</span>
        </div>
        <Image
          src="/profile-pic.png"
          alt="Jackson Schacher"
          width={128}
          height={128}
          className="rounded-md"
        />
      </div>
      <div className="flex justify-center w-full">
        <button>Chat with Me</button>
      </div>
      <div className="flex justify-center w-full">
        <Link
          href="/spotify"
          prefetch={active ? null : false}
          onMouseEnter={() => setActive(true)}
          className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative font-mono"
        >
          <button>Find a Song</button>
        </Link>
      </div>
    </div>
  );
}
