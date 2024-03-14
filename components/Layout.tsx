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
    
    </div>
  );
};

export default Layout;
