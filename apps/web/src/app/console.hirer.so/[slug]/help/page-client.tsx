"use client";

import React from "react";
import { ReactSparklyText } from "react-sparkly-text";

interface HelpViewProps {}

const HelpView: React.FC<HelpViewProps> = () => {
  return (
    <div>
      <p>
        We are here to help! If you have any questions, need assistance or even{" "}
        <ReactSparklyText>feature requests</ReactSparklyText>, please don&apos;t
        hesitate to reach out to us.
      </p>
      <p className="mt-2">
        📬 Email us at{" "}
        <a
          href="mailto:support@hirer.so"
          className="underline text-blue-500 hover:text-blue-700"
        >
          support@hirer.so
        </a>
        .
      </p>
    </div>
  );
};

export default HelpView;
