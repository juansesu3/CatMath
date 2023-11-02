import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cat Math</title>
        <meta name="description" content="learning Math with Cat." />

        <meta property="og:title" content="Cat math Inicio" />
      </Head>
      <div className="flex justify-center items-center  min-h-screen bg-primary relative">
        <div className="flex flex-col items-center justify-center gap-2  ">
          <span className="text-bold transform rotate-[-6]">
            <p className="text-medium text-3xl">
              CAT
            </p>
          </span>
          <span className="w-[280px]">
            <Image
              className="w-full"
              src={"/icon-892x920.png"}
              width={200}
              height={100}
              alt="Icon"
            />
          </span>

          <span className="text-bold transform rotate-[-6]">
            <p className="text-medium text-3xl ">MATH</p>
          </span>
          <span className="flex items-center justify-center border rounded-full w-4 h-4 p-10 bg-[#fee741]">
            <p className="text-medium text-3xl">X</p>
          </span>
        </div>
      </div>
    </>
  );
}
