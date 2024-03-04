// app/(CSR)/terminal/page.tsx

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// import TerminalComponent from "@components/Terminal";
const TerminalComponent = dynamic(() => import("@components/Terminal"), {
  ssr: false,
});

export default function TerminalPage() {
  const [shellUrl, setShellUrl] = useState("");

  useEffect(() => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    const port = window.location.port ? `:${window.location.port}` : "";
    const path = "/shell";

    const fullShellPath = `${protocol}//${hostname}${port}${path}`;

    setShellUrl(fullShellPath);

    const disableCtrlShiftC = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        event.shiftKey &&
        (event.key === "C" || event.key === "c")
      ) {
        event.preventDefault();
        // You can also implement your custom logic here if needed
        console.log("Ctrl+Shift+C is disabled on this page.");
      }
    };

    document.addEventListener("keydown", disableCtrlShiftC);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", disableCtrlShiftC);
    };
  }, []);

  return (
    <div style={{ padding: "20px", height: "90vh", width: "90vw" }}>
      {/* @TODO: FIGURE OUT HOW TO GET THE REAL PATH FOR VICE/DE */}
      <h1>Terminal</h1>
      <TerminalComponent src={shellUrl} />
    </div>
  );
}
