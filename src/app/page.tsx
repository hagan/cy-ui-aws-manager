// ./src/app/page.tsx
"use client";

import type { Props } from "./types";
import type { NextPage } from "next";
import { headers } from "next/headers";
import React, { useEffect, useState } from "react";

const Home: NextPage<Props> = ({ params }) => {
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("/api/v2/user-ip");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Failed to fetch IP address: ", error);
      }
    };
    fetchIP();
  }, []);

  return (
    <div>
      <h2>AWS Manager</h2>
      <h4>Your IP: {ipAddress}</h4>
      <p>
        State: Only terminal access is supported. Please click terminal link to
        shell into service and test the following commands:
      </p>
      <ul>
        <li>flask setup-s3</li>
        <li>flask setup-vpc</li>
        <li>flask create-ec2</li>
        <li>...</li>
        <li>Work in progress</li>
      </ul>
    </div>
  );
};

export default Home;
