import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Home: React.FC = () => {
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const handleClick = () => {
    // Cambiar a la URL deseada
    // router.push('/ruta-del-juego');
  };

  return (
    <>
      <Head>
        <title>Cat Math</title>
        <meta name="description" content="learning Math with Cat." />

        <meta property="og:title" content="Cat math Inicio" />
      </Head>
      <div className="relative font-myFont text-secondary flex justify-center items-center  min-h-screen bg-primary ">
        <div className="flex flex-col items-center justify-center gap-4 absolute top-[15%] ">
          <div className="inline-block transform rotate-[-12deg] w-full text-left px-12">
            <span className="text-medium text-5xl">CAT</span>
          </div>
          <span className="w-[220px]">
            <Image
              className="w-full"
              src={"/icon-892x920.png"}
              width={200}
              height={100}
              alt="Icon"
            />
          </span>

          <div className="inline-block transform rotate-[12deg] w-full text-right px-6">
            <span className="text-medium text-5xl ">MATH</span>
          </div>
          <span
            className="rounded-full relative w-[100px] h-[100px] bg-[#fee741] flex items-center justify-center"
            onMouseEnter={() => setShowPlayIcon(true)}
            onMouseLeave={() => setShowPlayIcon(false)}
            onClick={handleClick}
          >
            <div
              className={`transition-all duration-500 ease-in-out ${
                showPlayIcon ? " hidden " : " flex "
              }`}
            >
              <p className={`text-5xl absolute top-[20%] left-[32%]`}>X</p>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out absolute ${
                showPlayIcon
                  ? "transform translate-x-0 opacity-100"
                  : "opacity-0 translate-x-full"
              }`}
            >
              {showPlayIcon && (
                <Link href="/tableStart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 font-bold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </span>
        </div>
      </div>
    </>
  );
};
export default Home;
