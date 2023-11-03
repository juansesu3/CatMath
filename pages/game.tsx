import Game from "@/components/Game";
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
      <Game />
    </>
  );
};

export default GamePage;
