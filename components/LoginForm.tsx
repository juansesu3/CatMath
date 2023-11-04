import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export interface SignInCredentials {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<SignInCredentials>({
    email: "",
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

  const handleSignIn = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setError(false);
      const { email, password } = credentials;
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (result?.error) {
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    },
    [credentials]
  );

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
          <form className="flex flex-col gap-2 mt-2">
            <input
              name="email"
              type="text"
              placeholder="user"
              value={credentials.email}
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
            <Link href="/register" className="text-md font-light cursor-pointer hover:text-secondary transition duration-300 ease-in-out">
              Don&apos;t have an account yet?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
