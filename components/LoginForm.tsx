import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export interface SignInCredentials {
  name: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<SignInCredentials>({
    name: "", // Reemplaza 'email' con 'name'
    password: "",
  });
  const [error, setError] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }, []);

  const handleSignIn = (provider)=>{

    signIn(provider)

  }
  return (
    <div className="font-myFont w-screen h-screen flex  justify-center items-center">
      <div className=" flex flex-col text-center w-full m-auto">
        <div className="flex flex-col  w-52 m-auto">
          <div>
            <Image
              src={"https://my-page-negiupp.s3.amazonaws.com/1699050274789.png"}
              alt="logo image"
              width={200}
              height={100}
            />
          </div>
          {/* 
          <form className="flex flex-col gap-2 mt-2">
            <input
              name="name"
              type="text"
              placeholder="user name"
              value={credentials.name}
              onChange={handleChange}
              className="rounded-md p-2 shadow-sm focus:shadow-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={credentials.password}
              onChange={handleChange}
              className="rounded-md p-2 shadow-sm focus:shadow-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            />
            <button
              onClick={handleSignIn}
              className="bg-[#3ab14b] p-2 px-4 rounded-md text-white hover:bg-[#f14c90] font-medium shadow-md transition duration-300 ease-in-out"
            >
              Login
            </button>
            {error && (
              <p className="error-message-class-names">Invalid Credentials</p>
            )}
          </form>
         
          <div>
            <Link
              href="/register"
              className="text-md font-light cursor-pointer hover:text-secondary transition duration-300 ease-in-out"
            >
              Don&apos;t have an account yet?
            </Link>
          </div>
           */}
            <button
              onClick={()=>handleSignIn('google')}
              className="bg-[#3ab14b] mt-4 p-2 px-4 rounded-md text-white hover:bg-[#f14c90] font-medium shadow-md transition duration-300 ease-in-out"
            >
              Login with Google
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
