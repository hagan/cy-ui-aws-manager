// app/(SSR)/terminal/page.tsx
import dynamic from 'next/dynamic';

// import TerminalComponent from "@components/Terminal";
const TerminalComponent = dynamic(() => import('@components/Terminal'), { ssr: false });

export const metadata = {
    title: "Terminal - AWS Manager",
};

export default async function Page() {
    return (
        <div style={{ padding: "20px", height: "90vh", width: "90vw" }}>
            <TerminalComponent src="http://localhost/shell" />
        </div>
    );
}