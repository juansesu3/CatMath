import React from "react";
import { signOut, useSession } from "next-auth/react";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();

  const logout = async () => {
    await router.push("/");
    await signOut();
  };

  if (!session) {
    return <LoginForm />;
  }

  return (
    <div>
      {children}
      <button
        onClick={logout}
        className="bg-red-500  mb-2 cursor-pointer hover:bg-gray-400 px-4 py-1  m-auto text-white font-myFont flex items-center justify-center rounded-md mt-6 shadow-md transition duration-300 ease-in-out"
      >
        logout
      </button>
    </div>
  );
};

export default Layout;
