// components/Terminal.tsx
"use client";
// import { ITerminalOptions, ITheme } from '@xterm/xterm';

// , { useEffect, useRef }
import React from "react";
// import { Terminal } from "xterm";
import "xterm/css/xterm.css"; // Import Xterm.js CSS

interface TerminalComponentProps {
  src: string;
  width?: string; // Optional prop, with a default value provided
  height?: string; // Optional prop, with a default value provided
}

const TerminalComponent: React.FC<TerminalComponentProps> = ({
  src,
  width = "80%",
  height = "400px",
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* If you want to add any text or elements inside the grey box, you can add them here */}
    </div>
  );

  // return (
  //   <iframe
  //     src={src}
  //     width={width}
  //     height={height}
  //     style={{ border: 'none'}}
  //     title="Ttyd Terminal"
  //   ></iframe>
  // );
};

// const TerminalComponent: React.FC = () => {
//   // Use `HTMLDivElement` to provide a type for the ref.
//   const terminalRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // This ensures the code inside this block runs only in a browser environment
//     if (typeof window === "undefined") return;
//     // ensure we can ref the terminal
//     // if (!terminalRef.current) return;

//     const terminal = new Terminal();
//     if (terminalRef.current) {
//       terminal.open(terminalRef.current);
//     } else {
//       // No terminal to connect to
//       return;
//     }
//     terminal.writeln("Connecting to tty server...");

//     // TODO: this needs to capture the domain of our current site?
//     // const ws = new WebSocket("ws://localhost:7681/ws");

//     const ws = new WebSocket("ws://localhost/ttyd/ws");

//     ws.onopen = () => {
//       terminal.writeln("Now connected to tty server!");
//     };

//     // Type for MessageEvent can be generic, but here it's assumed to be string
//     ws.onmessage = (event: MessageEvent<string>) => {
//       terminal.write(event.data);
//     };

//     // Send terminal input to the server
//     terminal.onData((data: string) => ws.send(data));

//     // You may need to implement a resize logic or use the fit addon here

//     return () => {
//       terminal.dispose();
//       ws && ws.close();
//     };
//   }, []);

//   return (
//     <div ref={terminalRef} style={{ height: "100%", width: "100%" }}></div>
//   );
// };

export default TerminalComponent;
