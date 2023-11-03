import React from "react";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  if (!session) {
    return <LoginForm />;
  }

  return <div>{children}</div>;
};

export default Layout;
