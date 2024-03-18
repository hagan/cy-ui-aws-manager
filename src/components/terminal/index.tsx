import React, { useState, useEffect, useRef, useCallback } from "react";
import "@xterm/xterm/css/xterm.css";
import { Modal } from "../modal";
import { Xterm, XtermOptions } from "../xterm";

interface Props extends XtermOptions {
  id: string;
}

export const Terminal: React.FC<Props> = ({ id, ...xtermOptions }) => {
  const [modal, setModal] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement>(null);
  const xtermRef = useRef<Xterm | null>(null);

  // Initialize xterm in a useEffect hook that runs only once
  useEffect(() => {
    if (!xtermRef.current) {
      xtermRef.current = new Xterm(xtermOptions, () => setModal(true));
      (async () => {
        await xtermRef.current?.refreshToken();
        if (containerRef.current && xtermRef.current) {
          xtermRef.current.open(containerRef.current);
          xtermRef.current.connect();
        }
      })();
    }

    // ComponentWillUnmount lifecycle
    return () => {
      if (xtermRef.current) {
        xtermRef.current.dispose();
      }
    };
  }, [xtermOptions]);

  const sendFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setModal(false);
    const files = event.target.files;
    if (files) {
      xtermRef.current?.sendFile(files);
    }
  }, []);

  return (
    <div id={id} ref={containerRef as any}>
      <Modal show={modal}>
        <label className="file-label">
          <input
            onChange={sendFile}
            className="file-input"
            type="file"
            multiple
          />
          <span className="file-cta">Choose files…</span>
        </label>
      </Modal>
    </div>
  );
};
