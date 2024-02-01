// app/(SSR)/terminal/page.tsx
import TerminalComponent from "@/components/Terminal";

export const metadata = {
  title: "Terminal - AWS Manager",
};

export default async function Page() {
  return (
    <div style={{ padding: "20px", height: "90vh", width: "90vw" }}>
      <TerminalComponent />
    </div>
  );
}
