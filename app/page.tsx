import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image
        src="/profile-pic.png"
        alt="Jackson Schacher"
        width={128}
        height={128}
        priority
      />
      <h1>Jackson Schacher</h1>
    </div>
  );
}
