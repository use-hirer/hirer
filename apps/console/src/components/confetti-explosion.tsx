"use client";

import { Button } from "@console/components/ui/button";
import React from "react";
import Confetti from "react-confetti";

export default function ConfettiExplosion() {
  const [isExploding, setIsExploding] = React.useState<boolean>(false);
  const width = window.innerWidth;
  const height = document.body.scrollHeight;

  return (
    <>
      {isExploding && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      <Button onClick={() => setIsExploding(true)}>Explode</Button>
    </>
  );
}
