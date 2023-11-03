import Game from "@/components/Game";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

const GamePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Layout>
        <Game />
      </Layout>
    </>
  );
};

export default GamePage;
