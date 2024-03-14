import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginForm: React.FC = () => {
  
  const handleSignIn = (provider: string)=>{
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
            <button
              onClick={()=>handleSignIn('google')}
              className="bg-[#3ab14b] mt-4 p-2 px-4 rounded-md text-white hover:bg-[#f14c90] font-medium shadow-md transition duration-300 ease-in-out">
              Login with Google
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
